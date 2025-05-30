"use client"
import Image from "next/image";
import Fa6SolidLanguage from "./LanguageIcon";
import ClockIcon from "./ClockIcon"
import LinkIcon from "./LinkIcon"
import CalendarIcon from "./CalendarIcon"
import SchoolIcon from "./SchoolIcon"
import MapIcon from "./MapIcon"
import DownArrowIcon from "./DownArrowIcon"
import GoogleTranslateIcon from "./GoogleTranslateIcon"
import GoogleLensIcon from "./GoogleLensIcon"
import DocsIcon from "./DocumentIcon"
import MicrophoneIcon from "./MicrophoneIcon"
import ChatIcon from "./MessageIcon"
import MicrosoftIcon from "./MicrosoftTranslateIcon"
import ConversationIcon from "./ConversationIcon"
import EmailIcon from "./EmailIcon"
import TalkingPointsIcon from "./TalkingPointsIcon"
import FisdLogo from "../../public/fisd-logo-white-rgb.svg"

import Fuse from 'fuse.js'

import { getPossibleLangs, getContent, getSupportedLanguages } from "./backend_actions";

import { getLangCodeList, getLangNameFromCode } from "language-name-map";

import { Popover, PopoverTarget, Center, Modal, Loader, PopoverDropdown, Input, NumberInput } from '@mantine/core';
import { useEffect, useState, useRef } from "react";

import { useParams } from "next/navigation";

let fuse = undefined;

export default function Home({content, onLangChanged, onLangSearchChanged}) {
  const languages = ["English", "Español", "한국인", "हिंदी", "日本語", "Français"];

  const [displayLangPlaceholder, setDisplayLangPlaceholder] = useState("");

  const [expandedTab, setExpandedTab] = useState(-1);
  const [cloudLangs, setCloudLangs] = useState([]);

  const [languageChips, setLanguageChips] = useState([])
  const [currentLang, setCurrentLang] = useState("English");

  const [currentLangCode, setCurrentLangCode] = useState('en')

  const [contentVersion, setContentVersion] = useState({});

  const [loading, setLoading] = useState(true);

  const scheduleScrollRef = useRef(null);

  const linkScrollRef = useRef(null);

  const helpScrollRef = useRef(null);

  const contactScrollRef = useRef(null);

  const [onNewCloudLangs, setOnNewCloudLangs] = useState();

  const { version_id } = useParams();


  function shuffle(array) {
    let currentIndex = array.length;
  
    while (currentIndex != 0) {
  
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

  async function topTextAnim(langs) {
    shuffle(langs)
    const titles = langs; 
    let deleting = false;

    let titleIndex = 0;
    let charIndex = 0;
    let str = "";
    while (true) {
       await new Promise(resolve => setTimeout(resolve, 200));

       if (!deleting){
          let u = str + titles[titleIndex][charIndex];
          setDisplayLangPlaceholder(u)
          str = u;
          
          if (charIndex + 1 == titles[titleIndex].length){
            await new Promise(resolve => setTimeout(resolve, 800));

            while (str.length > 0){
              await new Promise(resolve => setTimeout(resolve, 100));
              let u = str.substring(0, str.length - 1);
              setDisplayLangPlaceholder(u)
              str = u;
            }

            if (titleIndex + 1 == titles.length){
              titleIndex = 0;
            }else{
              titleIndex += 1;
            }

            charIndex = 0;
          }else{
            charIndex += 1;
          }
       }
    }
  }

  function getLanguageCode(languageName) {
    try {
        const q = getLangCodeList();

        for (let i = 0; i < q.length; i++) {
            const element = q[i];

            
            if (getLangNameFromCode(element) && getLangNameFromCode(element).name && getLangNameFromCode(element).name.toLowerCase() == languageName.toLowerCase()){
                return element;
            }
        }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }

    return null;
  }
  
  async function getLangs(langCode) {
    setLoading(true);
    const n = await getSupportedLanguages(langCode);

    if (cloudLangs.length == 0) {
        topTextAnim(n.languages.map((q) => {
            return q.name
          }));      
    }

    setCloudLangs(n.languages);
    
    
    
    fuse = new Fuse(n.languages.map((x) => {
        const q = x;
        q.name = q.name.toLowerCase();
    
        return q;
    }), {
        keys: ['title', 'name', 'code', 'code']
      })

      setLoading(false);
    
    
  }

  function iOS() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  }


  useEffect(() => {
    getLangs('en')
  }, [])

  return (
    <>
    <Modal classNames={{body:'bg-[#184366]'}} opened={loading} centered={true} onClose={() => {}} withCloseButton={false}>
        <h1 className="text-center text-[23px] text-[#e8b20f] p-3">
            Doing some magic...
        </h1>
        <div className="justify-center w-[100%] m-auto">
            <Center>
                <Loader color="#e8b20f" />
            </Center>
            
        </div>
        
      </Modal>

    <div style={{display:'flex', padding:'auto'}} className="w-12/12 bg-[#184366] h-fit h-min-[75px] justify-right">
    <div className="w-[75%] flex flex-wrap justify-center items-center m-auto">
        <Image
        priority
        className="w-[250px] m-auto p-3"
        src={FisdLogo}
        alt="Frisco ISD Logo"
        />
      <p onClick={() => {
        scheduleScrollRef.current.scrollIntoView({behavior: 'smooth', block: 'center'})
      }} className="text-white font-light p-2 m-auto text-lg cursor-pointer">
          {(contentVersion.schedule_nav_header || "SCHEDULE").toUpperCase()}
        </p>
        <p onClick={() => {
        linkScrollRef.current.scrollIntoView({behavior: 'smooth', block: 'center'})
      }} className="text-white font-light p-2 m-auto text-lg cursor-pointer">
          {(contentVersion.links_nav_header || "LINKS").toUpperCase()}
        </p>
        <p onClick={() => {
        helpScrollRef.current.scrollIntoView({behavior: 'smooth', block: 'center'})
      }} className="text-white font-light p-2 m-auto text-lg cursor-pointer">
        {(contentVersion.help_nav_header || "HELP").toUpperCase()}
        </p>
        <p onClick={() => {
        contactScrollRef.current.scrollIntoView({behavior: 'smooth', block: 'center'})
      }} className="text-white font-light p-2 m-auto text-lg cursor-pointer">
        {(contentVersion.contact_nav_header || "CONTACT").toUpperCase()}
      </p>
    </div>
      
    </div>
    <div className="w-12/12 h-[5px] bg-white">

    </div>
    <h1 className="font-serif text-[#184366] w-[100%] text-[50px] mt-5 text-center m-auto justify-center">
      {contentVersion.page_header || "Welcome to Your Resource Hub!"}
    </h1>
    <p className="w-[37%] min-w-[350px] text-[22px] text-center justify-center m-auto p-[5px]">
      {contentVersion.header_subtitle || "This app is designed to help emergent bilingual students navigate Frisco ISD with confidence. Find your schedule, important links, and translation resources all in one place."}
    </p>
    <div className="flex w-[100%] p-[35px] items-center m-auto justify-center">
    <Fa6SolidLanguage className="w-[40px] fill-[#e8b20f] h-[25px] m-[5px] mt-[10px]"/>
      <p className="text-[22px] text-[#e8b20f]">
        {contentVersion.select_lang_label || "Select Your Language"}
      </p>
      
    </div>
    <div className="w-[100%] items-center m-auto justify-center">
      <Input onChange={(e) => {
        if (loading || e.target.value == "" || !fuse) return;

        let r = fuse.search(e.target.value.toLowerCase()).filter((c) => {
            return c != undefined
        }).map((a) => {
            return a.item.name.substring(0, 1).toUpperCase() + a.item.name.substring(1, a.item.name.length)
        }).filter((q, i, arr) => {
            return arr.indexOf(q) == i;
        });

        r = r.slice(0, Math.min(r.length, 25))

        r = r.reverse();

        setLanguageChips(r)
      }} className="m-auto justify-center max-w-[400px] w-[80%] text-center" radius={'md'} variant="filled" placeholder={displayLangPlaceholder} />
    </div>
    <div className="w-[80%] items-start flex-wrap flex justify-start m-auto mt-3 h-[140px] overflow-hidden transition-all duration-200">
      {
        cloudLangs.sort((a, b) => {
          const aV = languageChips.findIndex((w) => {
            return w.toLowerCase() == a.name;
          })

          const bV = languageChips.findIndex((w) => {
            return w.toLowerCase() == b.name;
          })

          return bV - aV;
        }).map((z, i) => {
          return <div onClick={async () => {
                setLoading(true);
                const res = await getContent(version_id || 'ehs', z.code)

                setCurrentLangCode(cloudLangs.find((w) => {
                    return w.name.toLowerCase() == z.name.toLowerCase()
                }).code);

                await getLangs(cloudLangs.find((w) => {
                    return w.name.toLowerCase() == z.name.toLowerCase()
                }).code);

                setContentVersion(res.content);
                setLoading(false);
            }} style={{visibility: languageChips.some((w) => {
            return w.toLowerCase() == z.name
          }) ? 'visible' : 'hidden',
          opacity: languageChips.some((w) => {
            return w.toLowerCase() == z.name
          }) ? 1 : 0}} key={z.code} className="bg-[#184366] p-1 rounded-sm m-3 mt-1 mb-3 cursor-pointer transition-all duration-200">
          <p className="text-white">{z.name.substring(0, 1).toUpperCase() + z.name.substring(1, z.name.length)}</p>
      </div>
          
        })
        /*
        languageChips.map((z, i) => {
            if (!z) return <div key={i}></div>

            return cloudLangs.find((w) => {
                    return w.name.toLowerCase() == z.toLowerCase()
                }) && cloudLangs.find((w) => {
                    return w.name.toLowerCase() == z.toLowerCase()
                }).code == currentLangCode ?
            <div key={z} className="bg-[#184366] p-1 rounded-sm m-3 cursor-pointer transition-all duration-200">
                <p className="text-white">{z}</p>
            </div>
      :
            <div key={z} onClick={async () => {
                const res = await getContent('ehs', cloudLangs.find((w) => {
                    return w.name.toLowerCase() == z.toLowerCase()
                }).code)

                setCurrentLangCode(cloudLangs.find((w) => {
                    return w.name.toLowerCase() == z.toLowerCase()
                }).code);

                getLangs(cloudLangs.find((w) => {
                    return w.name.toLowerCase() == z.toLowerCase()
                }).code);

                setContentVersion(res.content);
            }} className="bg-[#e8b20f51] p-1 rounded-sm m-3 cursor-pointer transition-all duration-200">
                <p className="text-[#184366]">{z}</p>
            </div>

        })
            */
      }
    </div>

    <div ref={scheduleScrollRef} className="w-[80%] shadow-lg items-center p-1 justify-center m-auto rounded-md mt-20 bg-[#184366]"> 
      <h1 className="text-left w-[fit-content]] text-white text-[30px] p-7 pr-0 flex">{contentVersion.bell_schedule_label || "2025 - 2026 Bell Schedule"}<ClockIcon className="m-auto fill-[#ffffff] ml-[1%] w-10 h-9"/></h1>
        
      <div className="rounded-tl-md rounded-tr-md m-7 mb-0 mt-1 bg-[#e8b20f] flex justify-center">
        <p className="p-2 w-[30%] text-[#184366] pr-[10%] text-left font-[500] m-auto text-[20px]">
          {contentVersion.schedule_period_label || "Period"}
        </p>
        <p className="p-2 w-[30%] text-[#184366] pr-[10%] text-left font-[500] m-auto text-[20px]">
          {contentVersion.schedule_time_label || "Time"}
        </p>
        <p className="p-2 w-[30%] text-[#184366] pr-[10%] text-left font-[500] m-auto text-[20px]">
          {contentVersion.schedule_class_length_label || "Class Length"}
        </p>
      </div>
      <div className="rounded-tl-md rounded-tr-md m-7 mt-1 mb-2 flex justify-center">
        <p className="p-2 w-[30%] pr-[10%] text-left font-light text-white m-auto text-[20px]">
          1
        </p>
        <p className="p-2 w-[30%] pr-[10%] text-left font-light text-white m-auto text-[20px]">
          9:00 - 10:25
        </p>
        <p className="p-2 w-[30%] pr-[10%] text-left font-light text-white m-auto text-[20px]">
          85 {contentVersion.schedule_mins_label || "Mins"}
        </p>
      </div>
      <div className="rounded-tl-md rounded-tr-md m-7 mt-1 mb-2 flex justify-center">
        <p className="p-2 w-[30%] pr-[10%] text-left font-light text-white m-auto text-[20px]">
          2
        </p>
        <p className="p-2 w-[30%] pr-[10%] text-left font-light text-white m-auto text-[20px]">
          10:30 - 12:00
        </p>
        <p className="p-2 w-[30%] pr-[10%] text-left font-light text-white m-auto text-[20px]">
          90 {contentVersion.schedule_mins_label || "Mins"}
        </p>
      </div>
      <div className="rounded-tl-md rounded-tr-md m-7 mt-1 mb-2 flex justify-center">
        <p className="p-2 w-[30%] pr-[10%] text-left font-light text-white m-auto text-[20px]">
          {"Mav Time"}
        </p>
        <p className="p-2 w-[30%] pr-[10%] text-left font-light text-white m-auto text-[20px]">
          12:05 - 12:25
        </p>
        <p className="p-2 w-[30%] pr-[10%] text-left font-light text-white m-auto text-[20px]">
          20 {contentVersion.schedule_mins_label || "Mins"}
        </p>
      </div>
      <div className="rounded-tl-md rounded-tr-md m-7 mt-1 mb-2 flex justify-center">
        <p className="p-2 w-[30%] pr-[10%] text-left font-light text-white m-auto text-[20px]">
          {contentVersion.schedule_power_hour_label || "Power Hour"}
        </p>
        <p className="p-2 w-[30%] pr-[10%] text-left font-light text-white m-auto text-[20px]">
          12:25 - 1:25
        </p>
        <p className="p-2 w-[30%] pr-[10%] text-left font-light text-white m-auto text-[20px]">
          60 {contentVersion.schedule_mins_label || "Mins"}
        </p>
      </div>
      <div className="rounded-tl-md rounded-tr-md m-7 mt-1 mb-2 flex justify-center">
        <p className="p-2 w-[30%] pr-[10%] text-left font-light text-white m-auto text-[20px]">
          3
        </p>
        <p className="p-2 w-[30%] pr-[10%] text-left font-light text-white m-auto text-[20px]">
          1:30 - 2:55
        </p>
        <p className="p-2 w-[30%] pr-[10%] text-left font-light text-white m-auto text-[20px]">
          85 {contentVersion.schedule_mins_label || "Mins"}
        </p>
      </div>
      <div className="rounded-tl-md rounded-tr-md m-7 mt-1 flex justify-center">
        <p className="p-2 w-[30%] pr-[10%] text-left font-light text-white m-auto text-[20px]">
          4
        </p>
        <p className="p-2 w-[30%] pr-[10%] text-left font-light text-white m-auto text-[20px]">
          2:55 - 4:25
        </p>
        <p className="p-2 w-[30%] pr-[10%] text-left font-light text-white m-auto text-[20px]">
          85 {contentVersion.schedule_mins_label || "Mins"}
        </p>
      </div>
    </div>

    <div className="w-[80%] justify-center m-auto mt-20">
      <h1 className="text-left w-[fit-content]] text-[#184366] text-[30px] p-0 pr-0 flex">{contentVersion.important_links_header || "Important Links"}<LinkIcon className="m-auto fill-[#ffffff] ml-[1%] w-10 h-9"/></h1>
    </div>

    <div ref={linkScrollRef} className="flex gap-y-40 h-fit pb-20 flex-wrap w-[85%] m-auto justify-center mt-10">
    <div className="w-[28%] min-w-[300px] shadow h-[290px] m-auto rounded-md bg-[#184366]">
      <div className="h-min-20 flex h-fit m-auto flex-wrap p-3 w-[100%]">
        <CalendarIcon className="fill-white w-[35px] h-[35px] m-auto"/>
        <h1 className="text-white text-[30px] ml-3 m-auto">{contentVersion.school_website_header || "FISD A/B Calendar"}</h1>
        </div>
        <div className="h-min-20 flex min-h-[250px] h-fit rounded-md m-auto flex-wrap border-[#184366] border-2 p-3 bg-white w-[100%]">
            <p className="w-[80%] m-auto text-2xl mb-5">
              {contentVersion.ab_calendar_description || "View the official school calendar for important dates and events."}
            </p>
            <div onClick={() => {window.location.href = "https://drive.google.com/file/d/1ev_ixYlb-1UktbXNlXQcATUAr7lWXiEv/view?usp=drive_link"}} className="w-[90%] rounded-md cursor-pointer hover:bg-[#e8b20f54] transition-all duration-130 m-auto p-3 bg-[#e8b20f]">
              <p className="text-center font-semibold text-[#184366]">{contentVersion.ab_calendar_action_text || "View Calendar"}</p>
            </div>
        </div>
      </div>
      <div className="w-[28%] min-w-[300px] shadow h-[290px] m-auto rounded-md bg-[#184366]">
      <div className="h-min-20 flex h-fit m-auto flex-wrap p-3 w-[100%]">
        <SchoolIcon className="fill-white w-[35px] h-[35px] m-auto"/>
        <h1 className="text-white text-[30px] ml-3 m-auto">{contentVersion.school_website_header || "School Website"}</h1>
        </div>
          <div className="h-min-20 flex min-h-[250px] h-fit rounded-md m-auto flex-wrap border-[#184366] border-2 p-3 bg-white w-[100%]">
              <p className="w-[80%] m-auto text-2xl mb-5">
                {contentVersion.school_website_description || "Visit the official Emerson High School website for news and resources."}
              </p>
              <div onClick={() => {window.location.href = contentVersion.school_website_link || "https://schools.friscoisd.org/campus/high-school/emerson/home"}} className="w-[90%] rounded-md cursor-pointer m-auto p-3 hover:bg-[#e8b20f54] transition-all duration-130 bg-[#e8b20f]">
                <p className="text-center font-semibold text-[#184366]">{contentVersion.school_website_action_text || "Visit Website"}</p>
              </div>
          </div>
      </div>
      <div className="w-[28%] min-w-[300px] shadow h-[290px] m-auto rounded-md bg-[#184366]">
      <div className="h-min-20 flex h-fit m-auto flex-wrap p-3 w-[100%]">
          <MapIcon className="fill-white w-[35px] h-[40px] m-auto"/>
          <h1 className="text-white text-[30px] ml-0 m-auto">{contentVersion.school_map_header || "School Map"}</h1>
          </div>
          <div className="h-min-20 flex min-h-[250px] h-fit rounded-md m-auto flex-wrap border-[#184366] border-2 p-3 bg-white w-[100%]">
              <p className="w-[80%] m-auto text-2xl mb-5">
              {contentVersion.school_map_description || "Navigate the school campus with this detailed map."}
              </p>
              <div onClick={() => {window.location.href = "https://drive.google.com/file/d/1IpKtwHjp_Qco_eA7uNKZRl6bkHc5yqrb/view?usp=sharing"}} className="w-[90%] rounded-md cursor-pointer m-auto p-3 hover:bg-[#e8b20f54] transition-all duration-130 bg-[#e8b20f]">
                <p className="text-center font-semibold text-[#184366]">{contentVersion.school_map_action_text || "View Map"}</p>
              </div>
          </div>
      </div>
    </div>
    
    <div className="w-[80%] justify-center m-auto mt-20">
      <h1 className="text-left w-[fit-content]] text-[#184366] text-[30px] p-0 pr-0 flex">{contentVersion.translation_help_header || "Translation Help"}</h1>
    </div>

    <div ref={helpScrollRef} className="bg-[#184366] flex-wrap w-[80%] flex gap-10 justify-center mt-10 m-auto rounded-md p-10">
      <div className="rounded-md bg-[#184366] border-[#e8b20f] p-2 border-2 min-w-[250px] w-[45%]">
        <h1 className="text-white text-[20px] flex">
          <GoogleTranslateIcon className="fill-white w-[40px] h-[25px] mt-auto mb-auto"/>
          {contentVersion.translation_google_translate_header || "Google Translate"}
        </h1>
        <p className="text-white">
        {contentVersion.translation_google_translate_description || "Translate text, websites, or documents between languages."}
        </p>
        {
          expandedTab == 0 ?
          <p onClick={() => {setExpandedTab(-1)}} className="text-[#e8b20f] cursor-pointer flex w-[200px] transition-all duration-150">
            {contentVersion.translation_read_more_action_text || "How to use"}
            <DownArrowIcon className="mt-auto rotate-180 mb-auto w-[20px] ml-1 h-[27px] transition-all duration-150"/>
          </p>
          :
          <p onClick={() => {setExpandedTab(0)}} className="text-[#e8b20f] cursor-pointer flex w-[200px] transition-all duration-150">
          {contentVersion.translation_read_more_action_text || "How to use"}
            <DownArrowIcon className="mt-auto mb-auto rotate-0 w-[20px] ml-1 h-[27px] transition-all duration-150"/>
          </p>
        }

        {expandedTab == 0 ?
        <>
          <p className="text-white mt-1">
            {contentVersion.translation_google_translate_instructions_1 || "Go to"} <a className="text-[#e8b20f]" href="https://translate.google.com/?sl=auto&tl=en&op=translate">translate.google.com</a> {contentVersion.translation_google_translate_instructions_2 || "on a web browser, or search \"Google Translate\""}
          </p>
          <p className="text-white mt-2">
            {contentVersion.translation_google_translate_instructions_3 || "Google Translate is capable of translating"} <span className="text-[#e8b20f]">{contentVersion.translation_google_translate_instructions_4 || "Text, Images, Documents, and Websites"}</span>
          </p>
        </>
        
        :
        <>

        </>
        }

      </div>
      <div className="rounded-md bg-[#184366] border-[#e8b20f] p-2 border-2 min-w-[250px] w-[45%]">
        <h1 className="text-white text-[20px] flex">
          <GoogleLensIcon className="fill-white w-[40px] h-[25px] mt-auto mb-auto p-0.5"/>
          {contentVersion.translation_google_lens_header || "Google Lens"}
        </h1>
        <p className="text-white">
        {contentVersion.translation_google_lens_description || "Take a photo of text and translate it instantly."}
        </p>
        {
          expandedTab == 1 ?
          <p onClick={() => {setExpandedTab(-1)}} className="text-[#e8b20f] cursor-pointer flex w-[200px] transition-all duration-150">
          {contentVersion.translation_read_more_action_text || "How to use"}
            <DownArrowIcon className="mt-auto rotate-180 mb-auto w-[20px] ml-1 h-[27px] transition-all duration-150"/>
          </p>
          :
          <p onClick={() => {setExpandedTab(1)}} className="text-[#e8b20f] cursor-pointer flex w-[200px] transition-all duration-150">
          {contentVersion.translation_read_more_action_text || "How to use"}
            <DownArrowIcon className="mt-auto mb-auto rotate-0 w-[20px] ml-1 h-[27px] transition-all duration-150"/>
          </p>
        }

        {expandedTab == 1 ?
        <>
          <p className="text-white mt-1">
          {contentVersion.translation_google_lens_instructions_1 || "Download the Google Lens app from the"}  <a onClick={() => {
            /*
            if (iOS()){
              const link = 'itms-apps://apps.apple.com/id/app/lens-translate-image-search/id1587316791?l=id';
              window.location.href = link;
            }else {
              
            }
            */
          }}   className="text-[#e8b20f]">{contentVersion.translation_google_lens_instructions_stores || (iOS() ? "App Store (search \"Google Lens\")" : "Google Play Store")}</a> {contentVersion.translation_google_lens_instructions_2 || "on your phone"}
          </p>
          <p className="text-white mt-2">
            {contentVersion.translation_google_lens_instructions_3 || "Google lens uses your phone\'s camera to translate real text on"} <span className="text-[#e8b20f]">{contentVersion.translation_google_lens_instructions_4 || "Signs, Paper, or any other physically displayed text"}</span>
          </p>
        </>
        
        :
        <>

        </>
        }

      </div>
      <div className="rounded-md bg-[#184366] border-[#e8b20f] p-2 border-2 min-w-[250px] w-[45%]">
        <h1 className="text-white text-[20px] flex">
          <DocsIcon className="fill-white w-[40px] h-[35px] mt-auto mb-auto mr-1 p-0.5"/>
          {contentVersion.translation_google_docs_header || "Google Docs Translation"}
        </h1>
        <p className="text-white">
        {contentVersion.translation_google_docs_description || "Translate Google Docs easily between languages"}
        </p>
        {
          expandedTab == 2 ?
          <p onClick={() => {setExpandedTab(-1)}} className="text-[#e8b20f] cursor-pointer flex w-[200px] transition-all duration-150">
          {contentVersion.translation_read_more_action_text || "How to use"}
            <DownArrowIcon className="mt-auto rotate-180 mb-auto ml-1 w-[20px] h-[27px] transition-all duration-150"/>
          </p>
          :
          <p onClick={() => {setExpandedTab(2)}} className="text-[#e8b20f] cursor-pointer flex w-[200px] transition-all duration-150">
          {contentVersion.translation_read_more_action_text || "How to use"}
            <DownArrowIcon className="mt-auto mb-auto rotate-0 ml-1 w-[20px] h-[27px] transition-all duration-150"/>
          </p>
        }

        {expandedTab == 2 ?
        <>
          <p className="text-white mt-1">
          {contentVersion.translation_google_docs_instructions_1 || "In the"} <span className="text-[#e8b20f]">{"\""}Tools{"\""}</span> {contentVersion.translation_google_docs_instructions_2 || "menu of your Google Doc select the"} <span className="text-[#e8b20f]">{"\""}Translate document{"\""}</span> {contentVersion.translation_google_docs_instructions_3 || "option"}
          </p>
          <p className="text-white mt-2">
            {contentVersion.translation_google_docs_instructions_4 || "Select a target language, and a name for the new document and it will create a new tab in your browser with the new document"}
          </p>
        </>
        
        :
        <>

        </>
        }

      </div>
      <div className="rounded-md bg-[#184366] border-[#e8b20f] p-2 border-2 min-w-[250px] w-[45%]">
        <h1 className="text-white text-[20px] flex">
          <MicrophoneIcon className="fill-white w-[40px] h-[35px] mt-auto mb-auto mr-1 p-0.5"/>
          Canvas {contentVersion.translation_canvas_reader_header || "Reader"}
        </h1>
        <p className="text-white">
          {contentVersion.translation_canvas_reader_description || "Have Canvas content read aloud to you."}
        </p>
        {
          expandedTab == 3 ?
          <p onClick={() => {setExpandedTab(-1)}} className="text-[#e8b20f] cursor-pointer flex w-[200px] transition-all duration-150">
          {contentVersion.translation_read_more_action_text || "How to use"}
            <DownArrowIcon className="mt-auto rotate-180 ml-1 mb-auto w-[20px] h-[27px] transition-all duration-150"/>
          </p>
          :
          <p onClick={() => {setExpandedTab(3)}} className="text-[#e8b20f] cursor-pointer flex w-[200px] transition-all duration-150">
          {contentVersion.translation_read_more_action_text || "How to use"}
            <DownArrowIcon className="mt-auto mb-auto ml-1 rotate-0 w-[20px] h-[27px] transition-all duration-150"/>
          </p>
        }

        {expandedTab == 3 ?
        <>
          <p className="text-white mt-1">
          {contentVersion.translation_canvas_reader_instructions_1 || "In the"} <span className="text-[#e8b20f]">{contentVersion.translation_canvas_reader_instructions_2 || "top right of an assignment, page, or syllabus"}</span> {contentVersion.translation_canvas_reader_instructions_3 || "select the immersive reader button, then"} <span className="text-[#e8b20f]">{contentVersion.translation_canvas_reader_instructions_4 || "select the top most right reading preferences button, and select a translation language"}</span> {contentVersion.translation_canvas_reader_instructions_5 || "option"}
          </p>
        </>
        
        :
        <>

        </>
        }

      </div>
      <div className="rounded-md bg-[#184366] border-[#e8b20f] p-2 border-2 min-w-[250px] w-[45%]">
        <h1 className="text-white text-[20px] flex">
          <ChatIcon className="fill-white w-[40px] h-[35px] mt-auto mb-auto mr-1 p-0.5"/>
          Kami {contentVersion.translation_canvas_reader_header || "Reader"}
        </h1>
        <p className="text-white">
        {contentVersion.translation_kami_reader_description|| "Translate PDF documents and worksheets."}
        </p>
        {
          expandedTab == 4 ?
          <p onClick={() => {setExpandedTab(-1)}} className="text-[#e8b20f] cursor-pointer flex w-[200px] transition-all duration-150">
          {contentVersion.translation_read_more_action_text || "How to use"}
            <DownArrowIcon className="mt-auto rotate-180 ml-1 mb-auto w-[20px] h-[27px] transition-all duration-150"/>
          </p>
          :
          <p onClick={() => {setExpandedTab(4)}} className="text-[#e8b20f] cursor-pointer flex w-[200px] transition-all duration-150">
          {contentVersion.translation_read_more_action_text || "How to use"}
            <DownArrowIcon className="mt-auto mb-auto ml-1 rotate-0 w-[20px] h-[27px] transition-all duration-150"/>
          </p>
        }

        {expandedTab == 4 ?
        <>
          <p className="text-white mt-1">
            {contentVersion.translation_kami_reader_instructions_1 || "When using Kami on any document select"} <span className="text-[#e8b20f]">{"\""}Understand{"\""}</span> {contentVersion.translation_kami_reader_instructions_2 || "on the sidebar, and click the language icon:"} <MicrosoftIcon className="fill-[#e8b20f]"/>
          </p>
          <p className="text-white mt-5">
            {contentVersion.translation_kami_reader_instructions_3 || "After enabling the translation feature, highlight some text and select a language."} <u><a href="https://help.kamiapp.com/en/articles/10414828-how-to-use-the-understand-tool" className="text-[#e8b20f]">{contentVersion.translation_kami_reader_instructions_4 || "See visual explanation here."}</a></u>
          </p>
        </>
        
        :
        <>

        </>
        }

      </div>

      <div className="rounded-md bg-[#184366] border-[#e8b20f] p-2 border-2 min-w-[250px] w-[45%]">
        <h1 className="text-white text-[20px] flex">
          <MicrosoftIcon className="fill-white w-[40px] h-[35px] mt-auto mb-auto mr-1 p-0.5"/>
          {contentVersion.translation_microsoft_translate_header || "Microsoft Translate"}
        </h1>
        <p className="text-white">
          {contentVersion.translation_microsoft_translate_description || "Translate conversations between languages."}
        </p>
        {
          expandedTab == 5 ?
          <p onClick={() => {setExpandedTab(-1)}} className="text-[#e8b20f] cursor-pointer flex w-[200px] transition-all duration-150">
          {contentVersion.translation_read_more_action_text || "How to use"}
            <DownArrowIcon className="mt-auto rotate-180 mb-auto w-[20px] ml-1 h-[27px] transition-all duration-150"/>
          </p>
          :
          <p onClick={() => {setExpandedTab(5)}} className="text-[#e8b20f] cursor-pointer flex w-[200px] transition-all duration-150">
          {contentVersion.translation_read_more_action_text || "How to use"}
            <DownArrowIcon className="mt-auto mb-auto rotate-0 w-[20px] ml-1 h-[27px] transition-all duration-150"/>
          </p>
        }

        {expandedTab == 5 ?
        <>
          <p className="text-white mt-1">
          {contentVersion.translation_microsoft_translate_instructions_1 || "In your web browser go to"} <u><a className="text-[#e8b20f]" href="https://translator.microsoft.com">translator.microsoft.com</a></u> {contentVersion.translation_microsoft_translate_instructions_2 || "and enter your conversation code, username, language, and the region you\'re from"}
          </p>
        </>
        
        :
        <>

        </>
        }

      </div>

    </div>

    <div className="w-[80%] shadow-lg items-center p-1 justify-center m-auto rounded-md mt-20 bg-[#184366]"> 
      <h1 className="text-left w-[fit-content]] text-white text-[30px] p-7 pr-0 flex flex-wrap">{contentVersion.sentence_starter_header || "Helpful Phrases & Sentence Starters"}
      <ConversationIcon className="m-auto fill-[#ffffff] ml-[1%] w-10 h-9"/>
      </h1>
        
      <div className="flex gap-2 flex-wrap">
      <div className="p-7 min-w-[300px] w-[45%]">
        <h1 className="text-[#e8b20f] text-[25px]">{contentVersion.sentence_starter_section_1 || "In the Classroom"}</h1>
        <div className="mt-5 flex">
          <div className="w-[5px] mb-auto mt-auto mr-2 h-[5px] rounded-sm bg-[#e8b20f]"/>
          <p className="text-white text-[18px]">
            I don{"\'"}t understand.
          </p>
          
        </div>
        <p className="text-gray-300 ml-3">
          {contentVersion.sentence_starter_1 || "No entiendo."}
        </p>
        <div className="mt-5 flex">
          <div className="w-[5px] mb-auto mt-auto mr-2 h-[5px] rounded-sm bg-[#e8b20f]"/>
          <p className="text-white text-[18px]">
            Can you please repeat that?
          </p>
          
        </div>
        <p className="text-gray-300 ml-3">
          {contentVersion.sentence_starter_2 || "¿Puede repetir eso, por favor?"}
        </p>
        <div className="mt-5 flex">
          <div className="w-[5px] mb-auto mt-auto mr-2 h-[5px] rounded-sm bg-[#e8b20f]"/>
          <p className="text-white text-[18px]">
            How do you say ___ in English?
          </p>
          
        </div>
        <p className="text-gray-300 ml-3">
          {contentVersion.sentence_starter_3 || "¿Cómo se dice ___ en inglés?"}
        </p>
        <div className="mt-5 flex">
          <div className="w-[5px] mb-auto mt-auto mr-2 h-[5px] rounded-sm bg-[#e8b20f]"/>
          <p className="text-white text-[18px]">
            May I go to the restroom?
          </p>
          
        </div>
        <p className="text-gray-300 ml-3">
          {contentVersion.sentence_starter_4 || "¿Puedo ir al baño?"}
        </p>
      </div>
      <div className="p-7 min-w-[300px] w-[45%]">
        <h1 className="text-[#e8b20f] text-[25px]">{contentVersion.sentence_starter_section_2 || "Sentence Starters"}</h1>
        <div className="mt-5 flex">
          <div className="w-[5px] mb-auto mt-auto mr-2 h-[5px] rounded-sm bg-[#e8b20f]"/>
          <p className="text-white text-[18px]">
            I think that...
          </p>
          
        </div>
        <p className="text-gray-300 ml-3">
          {contentVersion.sentence_starter_5 || "Yo pienso que..."}
        </p>
        <div className="mt-5 flex">
          <div className="w-[5px] mb-auto mt-auto mr-2 h-[5px] rounded-sm bg-[#e8b20f]"/>
          <p className="text-white text-[18px]">
            In my opinion...
          </p>
          
        </div>
        <p className="text-gray-300 ml-3">
        {contentVersion.sentence_starter_6 || "En mi opinión..."}
        </p>
        <div className="mt-5 flex">
          <div className="w-[5px] mb-auto mt-auto mr-2 h-[5px] rounded-sm bg-[#e8b20f]"/>
          <p className="text-white wrap-break-word text-[18px]">
            I agree/disagree because...
          </p>
          
        </div>
        <p className="text-gray-300 ml-3">
          {contentVersion.sentence_starter_7 || "Estoy de acuerdo/en desacuerdo porque..."}
        </p>
        <div className="mt-5 flex">
          <div className="w-[5px] mb-auto mt-auto mr-2 h-[5px] rounded-sm bg-[#e8b20f]"/>
          <p className="text-white text-[18px]">
            Can you help me with...
          </p>
          
        </div>
        <p className="text-gray-300 ml-3">
          {contentVersion.sentence_starter_8 || "¿Me puede ayudar con..."}
        </p>
      </div>
      </div>
      
    </div>

    <div className="w-[80%] justify-center m-auto mt-20">
      <h1 className="text-left w-[fit-content]] text-[#184366] text-[30px] p-0 pr-0 flex">{contentVersion.contact_information_header || "Contact Information"}</h1>
    </div>

    <div className="w-[80%] shadow-lg items-center p-0 justify-center m-auto rounded-md mt-20 bg-[#184366]"> 
        <div className="w-[100%] bg-[#e8b20f] p-4 rounded-md rounded-bl-none rounded-br-none">
            <h1 className="text-[#184366] text-[30px]">{contentVersion.contact_information_header_2 || "Need Help?"}</h1>
            <p className="text-[#184366] text-[20px]">{contentVersion.contact_information_description_1 || "Contact"} {contentVersion.contact_name || "Ms. Lau"} {contentVersion.contact_information_description_2 || "or use Talking Points for assistance."}</p>
        </div>
        <div className="w-[100%] p-4 flex justify-start pb-0 m-auto">
            <div className="bg-[#e8b20f] w-[50px] h-[50px] ml-0 mr-0 rounded-full p-3 m-auto">
                <EmailIcon className="w-[100%] fill-[#184366] m-auto h-[27px]"/>
            </div>
            <div className="p-3 m-auto ml-0">
                <p className="text-white font-semibold">
                    {contentVersion.contact_information_action_1 || "Email"} Ms. Lau
                </p>
                <p className="text-white">
                    {contentVersion.contact_email || "Lauall@friscoisd.org"}
                </p>
            
            
            </div>
            
        </div>
        <div ref={contactScrollRef} className="w-[100%] p-4 flex justify-start m-auto">
            <div className="bg-[#e8b20f] w-[50px] h-[50px] ml-0 mr-0 rounded-full p-3 m-auto">
                <TalkingPointsIcon className="w-[100%] fill-[#184366] m-auto h-[27px]"/>
            </div>
            <div className="p-3 m-auto ml-0">
                <p className="text-white font-semibold">
                    {contentVersion.contact_information_action_2 || "Talking Points"}
                </p>
                <p className="text-white">
                    {contentVersion.contact_information_class_code || "Class Code:"} <span className="text-[#e8b20f] font-semibold">{contentVersion.talking_points_code || "XQKXQR"}</span>
                </p>
            
            
            </div>
            
        </div>
    </div>

    <div className="mt-10 w-[100%] h-fit bg-[#184366] p-3 justify-center">
        <p className="m-auto text-center text-white font-light text-[20px]">{contentVersion.student_resources_label || "Bilingual Student Resources"}</p>
       <u className="decoration-[#e8b20f]"><a href="https://www.friscoisd.org/"> <p className="m-auto text-center text-[#e8b20f] font-light text-[20px]">{contentVersion.fisd_name || "Frisco Independent School District"}</p></a></u>
    </div>
    </>
    
  );
}