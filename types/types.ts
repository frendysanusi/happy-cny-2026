export type VibeMode = 'redFlag' | 'glowUp'

export interface Friend {
  id: string;
  name: string;
  image: string;
  shio: string;
  shioIcon: string;
  message: string;
  color: string;
}

export interface HokkienWisdom {
  phrase: string;
  translation: string;
}
