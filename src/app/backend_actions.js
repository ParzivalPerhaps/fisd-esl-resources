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
    'schedule_nav_header', 'links_nav_header',
    'help_nav_header', 'contact_nav_header',
    'sentence_starter_header', 'sentence_starter_section_1',
    'sentence_starter_section_2',
    'ab_calendar_description', 'ab_calendar_action_text',
    'school_website_header', 'school_website_description',
    'school_website_action_text','school_map_header', 
    'school_map_description', 'school_map_action_text',
    'translation_help_header', 'translation_read_more_action_text',
    'translation_google_translate_header', 'translation_google_translate_description',
    'translation_google_translate_instructions_1', 'translation_google_translate_instructions_2',
    'translation_google_translate_instructions_3', 'translation_google_translate_instructions_4',
    'translation_google_lens_header', 'translation_google_lens_description',
    'translation_google_lens_instructions_1', 'translation_google_lens_instructions_app_store',
    'translation_google_lens_instructions_google_play_store', 'translation_google_lens_instructions_stores',
    'translation_google_lens_instructions_2', 'translation_google_lens_instructions_3',
    'translation_google_lens_instructions_4', 'translation_google_docs_header',
    'translation_google_docs_description', 'translation_google_docs_instructions_1',
    'translation_google_docs_instructions_2', 'translation_google_docs_instructions_3',
    'translation_google_docs_instructions_4', 'translation_canvas_reader_header',
    'translation_canvas_reader_description', 'translation_canvas_reader_instructions_1',
    'translation_canvas_reader_instructions_2', 'translation_canvas_reader_instructions_3', 
    'translation_canvas_reader_instructions_4', 'translation_canvas_reader_instructions_5',
    'translation_kami_reader_description', 'translation_kami_reader_instructions_1',
    'translation_kami_reader_instructions_2', 'translation_kami_reader_instructions_3', 
    'translation_kami_reader_instructions_4', 'translation_microsoft_translate_header',
    'translation_microsoft_translate_description', 'translation_microsoft_translate_instructions_1',
    'translation_microsoft_translate_instructions_2', 'sentence_starter_1', 
    'sentence_starter_2',
    'sentence_starter_3',
    'sentence_starter_4',
    'sentence_starter_5',
    'sentence_starter_6',
    'sentence_starter_7',
    'sentence_starter_8',
    'contact_information_header',
    'contact_information_header_2',
    'contact_information_description_1',
    'contact_information_description_2',
    'contact_information_action_1',
    'contact_information_action_2',
    'contact_information_class_code',
    'fisd_name',
    'student_resources_label'







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

                if (u[element] == undefined) continue;
                
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

        contentObj.talking_points_code = q.talking_points_code
        contentObj.contact_name = q.contact_name
        contentObj.contact_email = q.contact_email

        return {success: true, content: contentObj}

    } catch (error) {
        console.error(error)
        return {success: false, content: undefined}
    }
    
}