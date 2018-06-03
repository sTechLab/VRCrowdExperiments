/**
 * Standard Language
 *
 * @flow
 * @format
 */

import {SERVER_ALIAS} from './Configs';
// INS: for all instructions
export const INS_TITLE = 'Instructions';

export const INS_WARNING = 'Stop at any time if you experience discomfort.';

export const INS_BODY_TEXTS = [
  'You task is to find an animal-shaped object in 1 minute. Once you find it, gaze and tap on the object.\n\nThe object appears at a random position at a random time.',
  'We are going to show you a 360 scene with some avatars. Make sure you are connected to wifi.\n\n You must stay in the VR environment for the duration of the study. We log your headset status every 5 - 10 seconds.',
  'For the best experience, we recommend sitting on a rotating desk chair.',
  'After either time runs out, or you find the object, you will see a final screen with a verification code that gives you access to the exit survey.',
];

export const INS_BUTTON_TEXTS = [
  'Okay',
  'I will stay in VR',
  'Sounds good',
  'Show me the scene',
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
