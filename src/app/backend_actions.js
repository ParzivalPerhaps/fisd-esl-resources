'use server';

const {Translate} = require('@google-cloud/translate').v2;

import dbConnect from "../../lib/dbConnect";
import ContentVersionModel from "./models/content_version"

const translate = new Translate();
translate.key = process.env.GOOGLE_TRANSLATE_API_KEY

let cachedLangs = [];

await dbConnect();

const versionAttributes = [
    'page_header', 'header_subtitle',
    'select_lang_label', 'bell_schedule_label',
    'schedule_period_label', 'schedule_time_label',
    'schedule_class_length_label', 'schedule_mav_time_label',
    'schedule_power_hour_label', 'schedule_mins_label', 
    'important_links_header', 'ab_calendar_header',
    'ab_calendar_description', 'ab_calendar_action_text',
    'school_website_header', 'school_website_description',
    'school_website_action_text','school_map_header', 
    'school_map_description', 


]

export async function getSupportedLanguages(lang) {
    const [languages] = await translate.getLanguages(lang);

    console.log(lang);
    
    if (lang == 'en'){
        cachedLangs = languages;
    }

  return { success: true, languages: languages };
}

export async function getContent(version_id, lang) {
    try {
        if (cachedLangs.length == 0){
            const [languages] = await translate.getLanguages(lang);

            cachedLangs = languages;
        }

        if (!cachedLangs.some((c) => {
            return c.code == lang
        })) throw new Error("Invalid lang code")

        let q = await ContentVersionModel.findOne({version_id: version_id, lang: lang})

        if (!q){
            let u = await ContentVersionModel.findOne({version_id: version_id, lang: 'en'});
    
            if (u == undefined){
                u = await ContentVersionModel.create({version_id: version_id, lang:'en', last_changed: new Date(), contact_email: 'Lauall@friscoisd.org', talking_points_code:"XXXXXX"});
            }

            q = await ContentVersionModel.create({
                version_id: version_id,
                last_changed: new Date(),
                lang: lang,
                contact_email: 'Lauall@friscoisd.org', 
                talking_points_code:"XXXXXX"
            });

            

            for (let i = 0; i < versionAttributes.length; i++) {
                const element = versionAttributes[i];

                console.log(u[element]);
                
                const [result] = await translate.translate(u[element], {
                    from: 'en',
                    to: lang
                });

                console.log(result);
                

                
                q[element] = result;
                console.log(q[element]);
            }

            await q.updateOne(q)
        } 

        let contentObj = {};

        for (let i = 0; i < versionAttributes.length; i++) {
            const element = versionAttributes[i];
            
            contentObj[element] = q[element];
        }

        return {success: true, content: contentObj}

    } catch (error) {
        console.error(error)
        return {success: false, content: undefined}
    }
    
}