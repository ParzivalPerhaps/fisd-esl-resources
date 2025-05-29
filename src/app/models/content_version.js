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
    default: 'Navigate the school campus with this detailed map.'
  },
  school_website_link: {
    type: String,
    required: true,
    default: 'https://drive.google.com/file/d/1IpKtwHjp_Qco_eA7uNKZRl6bkHc5yqrb/view?usp=sharing'
  },
  
  contact_email: {
    type: String,
    required: true,
    default: "Lauall@friscoisd.org"
  },
});

const ContentVersion = mongoose.models.ContentVersion || mongoose.model('ContentVersion', contentVersionSchema);

module.exports = ContentVersion