import { palettes } from "./tokens/palettes"
import { themes } from "./tokens/themes"
import { goals } from "./tokens/goals"
import { buildDesignTokens } from "./buildDesignTokens"

export function resolveDesignTokens(config: any) {
  const palette = palettes[config.palette as keyof typeof palettes];
  const theme = themes[config.theme as keyof typeof themes];
  const goal = goals[config.goal as keyof typeof goals];

  return buildDesignTokens({
    colorPaletteKey: config.palette,
    themeKey: config.theme,
    gender: config.gender,
    goalKey: config.goal,
    templateFamilyKey: config.template,
  });
}