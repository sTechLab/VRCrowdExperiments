/**
 * Standard Language
 *
 * @flow
 * @format
 */

import {SERVER_ALIAS} from './Configs';
// INS: for all instructions
export const INS_TITLE = 'Instructions for VR Ultimatum Game';

export const INS_WARNING = 'Stop at any time if you experience discomfort.';

export const INS_BODY_TEXTS = [
  'This is a study on playing games in VR.\n\n We are going to pair you up with a partner to play 8 - 10 rounds. Please make sure you are connected to wifi.',
  'Please play the games seriously.\n\n You must stay in the VR environment for the duration of the study. We log your headset status every 5 - 10 seconds.',
  'For the best experience, we recommend sitting on a rotating desk chair.',
  'If the game freezes, you may need to re-start.\n\n After finishing the game, you will come back to this room, and see a screen similar to this with a verification code that gives you access to the exit survey.',
];

export const INS_BUTTON_TEXTS = [
  'Okay',
  'I will stay in VR',
  'Sounds good',
  'Play game',
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

import {AVATAR_DISPLAY_NAMES} from './Configs';

export function getGameCharacterIntro(avatar_idx: number) {
  const GAME_CHARACTER_INTRO = [
    `Here is ${AVATAR_DISPLAY_NAMES[
      avatar_idx
    ]}, whom you will be playing with these few rounds.\n\n (Please give it a second for the avatar to load before you proceed.)`,
    `Now we are switching things up with a new opponent. In the upcoming rounds, you will be playing against ${AVATAR_DISPLAY_NAMES[
      avatar_idx
    ]}.\n\n (Please give it a second for the avatar to load before you proceed.)`,
  ];
  return GAME_CHARACTER_INTRO[avatar_idx];
}

export function getGameDescription(avatar_idx: number): any {
  // the number act as the page/step in the game, containing the text that needs to be displayed in the view at the step
  let GAME_DESCRIPTION = {
    '0': `You are now playing with ${AVATAR_DISPLAY_NAMES[
      avatar_idx
    ]} (avatar <-). You are chosen to propose a split first. \n\n How much would you like to give to ${AVATAR_DISPLAY_NAMES[
      avatar_idx
    ]} out of $100?`,
    '1': {
      accepted: `Great! ${AVATAR_DISPLAY_NAMES[
        avatar_idx
      ]} has accepted your offer.\n\n The money is now divided.`,
      rejected: 'Your offer was turned down.\n\n No one gets any money.',
    },
    '2': `${AVATAR_DISPLAY_NAMES[
      avatar_idx
    ]} received $100, and has proposed to give you $50 and keeps $50.\n\n Would you like to accept the offer?`,
    '3': {
      accepted: 'The money is now divided.',
      rejected: 'You have turned down the offer.\n\n No one gets any money.',
    },
    '4': `Now it's your turn to propose a split again. You are given $100.\n\n How much would you like to give to ${AVATAR_DISPLAY_NAMES[
      avatar_idx
    ]}?`,
    '5': {
      accepted: `${AVATAR_DISPLAY_NAMES[
        avatar_idx
      ]} has accepted your offer!\n\n The money is now divided.`,
      rejected: `${AVATAR_DISPLAY_NAMES[
        avatar_idx
      ]} has rejected your offer.\n\n No one gets any money.`,
    },
    '6': `${AVATAR_DISPLAY_NAMES[
      avatar_idx
    ]} received $100, and has proposed to give you $25 and keeps $75.\n\n Would you like to accept the offer?`,
    '7': {
      accepted: 'The money is now divided.',
      rejected: 'You have turned down the offer.\n\n No one gets any money.',
    },
    '8': {
      won: 'Congratulations, you won the past few rounds!',
      lost: `The winner of past few rounds is...${AVATAR_DISPLAY_NAMES[
        avatar_idx
      ]}!`,
      tie: `The past few rounds was a tie with ${AVATAR_DISPLAY_NAMES[
        avatar_idx
      ]}.`,
    },
  };
  return GAME_DESCRIPTION;
}

export const AVATAR_EDITOR_BODY =
  "Welcome to the game room! Let's first get you an avatar for the game.\n\n Please select the characteristics of avatar you prefer:";

export const AVATAR_DIALOG_BODY =
  "We are loading the avatar of whom you are playing the game with for the next few rounds. This is the same game you played on desktop. \n\n Each player can only see the opponent's avtar. (Please give it a second while the avatar loads.)\n\n Did the avatar of your opponent load successfully?";

export const Languages = {
  INS_TITLE,
  INS_WARNING,
  INS_BODY_TEXTS,
  INS_BUTTON_TEXTS,
  WELCOME_TITLE,
  WELCOME_BODY_HEADSET_NOTDETECTED,
  WELCOME_BODY_HEADSET_DETECTED,
  WELCOME_LABEL,
  AVATAR_EDITOR_BODY,
  AVATAR_DIALOG_BODY,
  EXIT_TITLE,
  EXIT_BODY,
};
