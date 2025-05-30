const mongoose = require('mongoose');

const contentVersionSchema = new mongoose.Schema({
  version_id: {
    type: String,
    required: true,
    unique: false
  },
  lang: {
    type: String,
    required: true,
    default: 'en'
  },
  last_changed: {
    type: Date,
    required: true,
  },
  talking_points_code: {
    type: String,
    required: true,
    default: "XQKXQR"
  },
  schedule_nav_header: {
    type: String,
    required: true,
    default: 'Schedule'
  },
  links_nav_header: {
    type: String,
    required: true,
    default: 'Links'
  },
  help_nav_header: {
    type: String,
    required: true,
    default: 'Help'
  },
  contact_nav_header: {
    type: String,
    required: true,
    default: 'Contact'
  },
  page_header: {
    type: String,
    required: true,
    default: 'Welcome to Your Resource Hub!'
  },
  header_subtitle: {
    type: String,
    required: true,
    default: 'This app is designed to help emergent bilingual students navigate Frisco ISD with confidence. Find your schedule, important links, and translation resources all in one place.'
  },
  select_lang_label: {
    type: String,
    required: true,
    default: 'Select Your Language'
  },
  bell_schedule_label: {
    type: String,
    required: true,
    default: '2025 - 2026 Bell Schedule'
  },
  schedule_period_label: {
    type: String,
    required: true,
    default: 'Period'
  },
  schedule_time_label: {
    type: String,
    required: true,
    default: 'Time'
  },
  schedule_class_length_label: {
    type: String,
    required: true,
    default: 'Time'
  },
  schedule_mav_time_label: {
    type: String,
    required: true,
    default: 'Mav Time'
  },
  schedule_power_hour_label: {
    type: String,
    required: true,
    default: 'Power Hour'
  },
  schedule_mins_label: {
    type: String,
    required: true,
    default: 'Mins'
  },
  important_links_header: {
    type: String,
    required: true,
    default: 'Important Links'
  },
  ab_calendar_header: {
    type: String,
    required: true,
    default: 'FISD A/B Calendar'
  },
  ab_calendar_description: {
    type: String,
    required: true,
    default: 'View the official school calendar for important dates and events.'
  },
  ab_calendar_action_text: {
    type: String,
    required: true,
    default: 'View Calendar'
  },
  school_website_header: {
    type: String,
    required: true,
    default: 'School Website'
  },
  school_website_description: {
    type: String,
    required: true,
    default: 'Visit the official Emerson High School website for news and resources.'
  },
  school_website_link: {
    type: String,
    required: true,
    default: 'https://schools.friscoisd.org/campus/high-school/emerson/home'
  },
  school_website_action_text: {
    type: String,
    required: true,
    default: 'Visit Website'
  },
  school_map_header: {
    type: String,
    required: true,
    default: 'School Map'
  },
  school_map_description: {
    type: String,
    required: true,
    default: 'Navigate the school campus with this detailed map.'
  },
  school_map_action_text: {
    type: String,
    required: true,
    default: 'View Map'
  },
  translation_help_header: {
    type: String,
    required: true,
    default: 'Translation Help'
  },
  translation_read_more_action_text: {
    type: String,
    required: true,
    default: 'How to use'
  },
  translation_google_translate_header: {
    type: String,
    required: true,
    default: 'Google Translate'
  },
  translation_google_translate_description: {
    type: String,
    required: true,
    default: 'Translate text, websites, or documents between languages.'
  },
  translation_google_translate_instructions_1: {
    type: String,
    required: true,
    default: 'Go to'
  },
  translation_google_translate_instructions_2: {
    type: String,
    required: true,
    default: 'on a web browser, or search "Google Translate"'
  },
  translation_google_translate_instructions_3: {
    type: String,
    required: true,
    default: 'Google Translate is capable of translating'
  },
  translation_google_translate_instructions_4: {
    type: String,
    required: true,
    default: 'Text, Images, Documents, and Websites'
  },
  translation_google_lens_header: {
    type: String,
    required: true,
    default: 'Google Lens'
  },
  translation_google_lens_description: {
    type: String,
    required: true,
    default: 'Take a photo of text and translate it instantly.'
  },
  translation_google_lens_instructions_1: {
    type: String,
    required: true,
    default: 'Download the Google Lens app from the'
  },
  translation_google_lens_instructions_app_store: {
    type: String,
    required: true,
    default: 'iOS App Store'
  },
  translation_google_lens_instructions_google_play_store: {
    type: String,
    required: true,
    default: 'Google Play Store'
  },
  translation_google_lens_instructions_stores: {
    type: String,
    required: true,
    default: 'iOS App Store or Google Play Store'
  },
  translation_google_lens_instructions_2: {
    type: String,
    required: true,
    default: 'on your phone'
  },
  translation_google_lens_instructions_3: {
    type: String,
    required: true,
    default: 'Google lens uses your phone\'s camera to translate real text on'
  },
  translation_google_lens_instructions_4: {
    type: String,
    required: true,
    default: 'Signs, Paper, or any other physically displayed text'
  },
  translation_google_docs_header: {
    type: String,
    required: true,
    default: 'Google Docs Translation'
  },
  translation_google_docs_description: {
    type: String,
    required: true,
    default: 'Translate Google Docs easily between languages.'
  },
  translation_google_docs_instructions_1: {
    type: String,
    required: true,
    default: 'In the'
  },
  translation_google_docs_instructions_2: {
    type: String,
    required: true,
    default: 'menu of your Google Doc select the'
  },
  translation_google_docs_instructions_3: {
    type: String,
    required: true,
    default: 'option'
  },
  translation_google_docs_instructions_4: {
    type: String,
    required: true,
    default: 'Select a target language, and a name for the new document and it will create a new tab in your browser with the new document'
  },
  translation_canvas_reader_header: {
    type: String,
    required: true,
    default: 'Reader'
  },
  translation_canvas_reader_description: {
    type: String,
    required: true,
    default: 'Have Canvas content read aloud to you.'
  },
  translation_canvas_reader_instructions_1: {
    type: String,
    required: true,
    default: 'In the'
  },
  translation_canvas_reader_instructions_2: {
    type: String,
    required: true,
    default: 'top right of an assignment, page, or syllabus'
  },
  translation_canvas_reader_instructions_3: {
    type: String,
    required: true,
    default: 'select the immersive reader button, then'
  },
  translation_canvas_reader_instructions_4: {
    type: String,
    required: true,
    default: 'select the top most right reading preferences button, and select a translation language'
  },
  translation_canvas_reader_instructions_5: {
    type: String,
    required: true,
    default: 'option'
  },
  translation_kami_reader_description: {
    type: String,
    required: true,
    default: 'Translate PDF documents and worksheets.'
  },
  translation_kami_reader_instructions_1: {
    type: String,
    required: true,
    default: 'When using Kami on any document select'
  },
  translation_kami_reader_instructions_2: {
    type: String,
    required: true,
    default: 'on the sidebar, and click the language icon:'
  },
  translation_kami_reader_instructions_3: {
    type: String,
    required: true,
    default: 'After enabling the translation feature, highlight some text and select a language.'
  },
  translation_kami_reader_instructions_4: {
    type: String,
    required: true,
    default: 'See visual explanation here.'
  },
  translation_microsoft_translate_header: {
    type: String,
    required: true,
    default: 'Microsoft Translate'
  },
  translation_microsoft_translate_description: {
    type: String,
    required: true,
    default: 'Translate conversations between languages.'
  },
  translation_microsoft_translate_instructions_1: {
    type: String,
    required: true,
    default: 'In your web browser go to '
  },
  translation_microsoft_translate_instructions_2: {
    type: String,
    required: true,
    default: 'and enter your conversation code, username, language, and the region you\'re from'
  },
  sentence_starter_header: {
    type: String,
    required: true,
    default: 'Helpful Phrases And Sentence Starters'
  },
  sentence_starter_section_1: {
    type: String,
    required: true,
    default: 'In the Classroom'
  },
  sentence_starter_section_2: {
    type: String,
    required: true,
    default: 'Sentence Starters'
  },
  sentence_starter_1: {
    type: String,
    required: true,
    default: 'I don\'t understand.'
  },
  sentence_starter_2: {
    type: String,
    required: true,
    default: 'Can you please repeat that?'
  },
  sentence_starter_3: {
    type: String,
    required: true,
    default: 'How do you say ___ in English?'
  },
  sentence_starter_4: {
    type: String,
    required: true,
    default: 'May I go to the restroom?'
  },
  sentence_starter_5: {
    type: String,
    required: true,
    default: 'I think that...'
  },
  sentence_starter_6: {
    type: String,
    required: true,
    default: 'In my opinion...'
  },
  sentence_starter_7: {
    type: String,
    required: true,
    default: 'I agree/disagree because...'
  },
  sentence_starter_8: {
    type: String,
    required: true,
    default: 'Can you help me with...'
  },
  contact_information_header: {
    type: String,
    required: true,
    default: 'Contact Information'
  },
  contact_information_header_2: {
    type: String,
    required: true,
    default: 'Need Help?'
  },
  contact_information_description_1: {
    type: String,
    required: true,
    default: 'Contact'
  },
  contact_information_description_2: {
    type: String,
    required: true,
    default: 'or use Talking Points for assistance.'
  },
  contact_information_action_1: {
    type: String,
    required: true,
    default: 'Email'
  },
  contact_information_action_2: {
    type: String,
    required: true,
    default: 'Talking Points'
  },
  contact_information_class_code: {
    type: String,
    required: true,
    default: 'Class Code:'
  },
  fisd_name: {
    type: String,
    required: true,
    default: 'Frisco Independent School District'
  },
  student_resources_label: {
    type: String,
    required: true,
    default: 'Bilingual Student Resources'
  },
  
  school_website_link: {
    type: String,
    required: true,
    default: 'https://drive.google.com/file/d/1IpKtwHjp_Qco_eA7uNKZRl6bkHc5yqrb/view?usp=sharing'
  },
  contact_name: {
    type: String,
    required: true,
    default: "Ms. Lau"
  },
  contact_email: {
    type: String,
    required: true,
    default: "Lauall@friscoisd.org"
  },
});

const ContentVersion = mongoose.models.ContentVersion || mongoose.model('ContentVersion', contentVersionSchema);

module.exports = ContentVersion