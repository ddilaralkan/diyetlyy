import { resolveDesignTokens }
from "./resolve"

import { templateRegistry }
from "../templates"

export default function TemplateRenderer({
  data,
  config
}: any) {

  const tokens =
    resolveDesignTokens(config)

  const Template =
    templateRegistry[
      config.template
    ]

  if (!Template) {
    return (
      <div>
        Template not found
      </div>
    )
  }

  return (
    <Template
      data={data}
      tokens={tokens}
    />
  )
}