/**
 * Standard Language
 *
 * @flow
 * @format
 */

import {SERVER_ALIAS} from './Configs';
// INS: for all instructions
export const INS_TITLE = 'Instructions for 360 Video Watching Study';

export const INS_WARNING = 'Stop at any time if you experience discomfort.';

export const INS_BODY_TEXTS = [
  'This is a study on 360 video watching.\n\n We are going to show you 360 video footage, for a total 2-4 minutes. Make sure you are connected to wifi.',
  'Please explore the video freely.\n\n You must stay in the VR environment for the duration of the study. We log your headset status every 5 - 10 seconds.',
  'For the best experience, put your volume up and headphones on.\n\n We also recommend sitting on a rotating desk chair.',
  'If the video freezes, you may need to re-start.\n\n After watching, you will return to this room and see a final screen with a VR verification code that gives you access to the exit survey.',
];

export const INS_BUTTON_TEXTS = [
  'Okay',
  'I will stay in VR',
  'Earphones are on',
  'Watch video',
];

export const WELCOME_TITLE = 'Welcome';

export const WELCOME_BODY_HEADSET_NOTDETECTED =
  'To participate in the study, launch "Samsung Internet VR" app. Then plug your phone into the Gear VR headset.\n\n Once in the headset, gaze and tap on the address bar. Type in this link: ' +
  SERVER_ALIAS +
  ' and click on "View in VR".';

export const WELCOME_BODY_HEADSET_DETECTED =
  'Gaze and tap to "Continue" to proceed.';

export const WELCOME_LABEL = 'VR Headset: ';

export const EXIT_TITLE = 'Your survey code: ';

export const EXIT_BODY =
  'You have finished the Virtual Reality part of the study. Your VR verification code is in the title.\n\n Go back to the Turk interface and proceed to click on the exit survey link immediately.\n\n The survey code expires in 3 minutes.';

export const Languages = {
  INS_TITLE,
  INS_WARNING,
  INS_BODY_TEXTS,
  INS_BUTTON_TEXTS,
  WELCOME_TITLE,
  WELCOME_BODY_HEADSET_NOTDETECTED,
  WELCOME_BODY_HEADSET_DETECTED,
  WELCOME_LABEL,
  EXIT_TITLE,
  EXIT_BODY,
};
