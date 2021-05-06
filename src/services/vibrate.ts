const Navigator = window.navigator as any;

const isVibrateSupported = 'vibrate' in navigator;

export default class Vibrate {
  public static do = (value: number = 10): boolean => {
    if (isVibrateSupported) {
      Navigator.vibrate([]);

      return Navigator.vibrate([value]);
    }

    return false;
  };
}
