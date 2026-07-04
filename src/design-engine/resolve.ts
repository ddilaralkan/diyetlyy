import { buildDesignTokens } from "./buildDesignTokens"

export function resolveDesignTokens(config: any) {
  return buildDesignTokens({
    colorPaletteKey: config.palette,
    themeKey: config.theme,
    gender: config.gender,
    goalKey: config.goal,
    templateFamilyKey: config.template,
  });
}
