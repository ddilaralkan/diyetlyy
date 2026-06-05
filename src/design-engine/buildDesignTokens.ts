import { palettes } from "./tokens/palettes";
import { themes } from "./tokens/themes";

interface DesignInput {
  colorPaletteKey: string;
  themeKey: string;
  gender: string;
  goalKey: string;
  templateFamilyKey: string;
}

export interface BuiltDesignToken {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  typography: {
    bodyFont: string;
    titleSize: number;
  };
  gender: string;
  goalKey: string;
  templateFamilyKey: string;
}

export function buildDesignTokens(input: DesignInput): BuiltDesignToken {
  const palette = palettes[input.colorPaletteKey as keyof typeof palettes];
  const theme = themes[input.themeKey as keyof typeof themes];

  if (!palette) throw new Error(`Palette bulunamadı: ${input.colorPaletteKey}`);
  if (!theme) throw new Error(`Theme bulunamadı: ${input.themeKey}`);

  return {
    colors: palette.colors,
    typography: theme.typography,
    gender: input.gender,
    goalKey: input.goalKey,
    templateFamilyKey: input.templateFamilyKey,
  };
}