interface RGB {
  r: number;
  b: number;
  g: number;
}

function hexToRGB(hex: string): RGB {
  return {
    r: parseInt(hex.substring(1, 3), 16),
    g: parseInt(hex.substring(3, 5), 16),
    b: parseInt(hex.substring(5, 7), 16),
  };
}

function calculateLuminance(rgb: RGB) {
  const a = [rgb.r, rgb.g, rgb.b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export function getContrastTextColor(
  hexColor: string,
  light = '#ffffff',
  dark = '#000000',
) {
  if (!hexColorRegex.test(hexColor)) {
    return dark;
  }

  const rgbColor = hexToRGB(hexColor);
  const luminance = calculateLuminance(rgbColor);
  return luminance > 0.5 ? dark : light;
}
