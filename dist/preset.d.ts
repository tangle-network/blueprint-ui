/**
 * Blueprint UI semantic token theme for UnoCSS.
 *
 * Components in this package use classes like `text-bp-elements-textPrimary`.
 * Each consuming app maps these to their own CSS variables by adding this
 * theme object under a `bp` key in their UnoCSS config:
 *
 *   import { bpThemeTokens } from '@tangle-network/blueprint-ui/preset';
 *   // theme: { colors: { bp: bpThemeTokens('cloud') } }
 *   // theme: { colors: { bp: bpThemeTokens('arena') } }
 */
declare function bpThemeTokens(prefix: string): {
    elements: {
        borderColor: string;
        borderColorActive: string;
        background: {
            depth: {
                1: string;
                2: string;
                3: string;
                4: string;
            };
        };
        textPrimary: string;
        textSecondary: string;
        textTertiary: string;
        button: {
            primary: {
                background: string;
                backgroundHover: string;
                text: string;
            };
            secondary: {
                background: string;
                backgroundHover: string;
                text: string;
            };
            danger: {
                background: string;
                backgroundHover: string;
                text: string;
            };
        };
        icon: {
            success: string;
            error: string;
            warning: string;
            primary: string;
            secondary: string;
        };
        dividerColor: string;
        item: {
            backgroundHover: string;
            backgroundActive: string;
        };
        focus: string;
    };
};

export { bpThemeTokens };
