import React, { PropsWithChildren, useEffect } from "react";
import {
    DocsContainer as BaseContainer,
    DocsContainerProps,
    Unstyled
} from "@storybook/addon-docs/blocks";
import { useDarkMode } from "@vueless/storybook-dark-mode";
import { darkTheme, lightTheme } from "./customTheme";
import "../dist/dsfr/utility/icons/icons.min.css";
import "../dist/dsfr/dsfr.css";
import { useIsDark } from "../dist/useIsDark";
import { startReactDsfr } from "../dist/spa";
import { fr } from "../dist/fr";
import { MuiDsfrThemeProvider } from "../dist/mui";
import { TableOfContentsCustom, TocType } from "./TableOfContents";

startReactDsfr({
    "defaultColorScheme": "system",
    "useLang": () => "fr"
});

export const DocsContainer = ({ children, context }: PropsWithChildren<DocsContainerProps>) => {
    const isStorybookUiDark = useDarkMode();
    const { setIsDark } = useIsDark();

    useEffect(() => {
        setIsDark(isStorybookUiDark);
    }, [isStorybookUiDark]);

    const backgroundColor = fr.colors.decisions.background.default.grey.default;

    // took from addon-docs/src/blocks/DocsContainer.tsx
    let toc: TocType | undefined;
    try {
        const meta = context.resolveOf("meta", ["meta"]);
        toc = meta.preparedMeta.parameters?.docs?.toc;
    } catch (err) {
        // No meta, falling back to project annotations
        toc = context?.projectAnnotations?.parameters?.docs?.toc;
    }

    return (
        <>
            <style>{`
                body {
                    padding: 0 !important;
                    background-color: ${backgroundColor};
                }

                .docs-story {
                    background-color: ${backgroundColor};
                }
                [id^=story--] .container {
                    border: 1px dashed #e8e8e8;
                }

                .docblock-argstable-head th:nth-child(3), .docblock-argstable-body tr > td:nth-child(3) {
                    visibility: collapse;
                }

                .docblock-argstable-head th:nth-child(3), .docblock-argstable-body tr > td:nth-child(2) p {
                    font-size: 13px;
                }

            `}</style>
            <BaseContainer context={context} theme={isStorybookUiDark ? darkTheme : lightTheme}>
                <MuiDsfrThemeProvider>
                    <Unstyled>
                        {toc && <TableOfContentsCustom channel={context.channel} />}
                        {children}
                    </Unstyled>
                </MuiDsfrThemeProvider>
            </BaseContainer>
        </>
    );
};
