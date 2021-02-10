import $ from 'jquery';
import {IColor} from '../Form/Login/SaveColorBtnComponent';
import {SaveColor} from '../Form/Login/SaveColor';

export default class ColorParams {
    /**
     * Get Singleton => We have a unique ColorParams instance
     * => First call will create the instance
     */
    public static getInstance = (): ColorParams => {
        if (!ColorParams.instance) {
            ColorParams.instance = new ColorParams();
        }
        return ColorParams.instance;
    }

    private static instance: ColorParams | null = null;
    private colors: Array<IColor> = [];
    private previewColors: IColor | null  = null;

    /**
     * Set User Colors
     * @param colors
     */
    public initColors = (colors: Array<IColor>): void => {
        this.colors = colors;
        this.applyColor();
    }

    /**
     * Get colors changed by user
     * - Apply new colors in CSS part
     * - Send new colors to server (only changed object is sent)
     * @param color
     */
    public saveColor(color: IColor): void {
        // Add / Replace type dans colors
        const newColors: Array<IColor> = [];
        newColors.push(color);
        this.colors.forEach((oldColor: IColor) => {
            if (oldColor.type !== color.type) {
                newColors.push(oldColor);
            }
        });
        this.colors = newColors;
        // Call server with this.colors
        const saveColor = new SaveColor();
        saveColor.save(color);

        this.resetColors();
    }

    public setPreviewMode = (enable: boolean): void => {
        if (enable) {
            $(document.body).addClass('preview');
        } else {
            $(document.body).removeClass('preview');
            this.resetColors();
        }
    }

    /**
     * Apply a preview color
     * @param color
     */
    public applyPreviewColor = (color: IColor): void => {
        this.previewColors = color;
        this.applyColor();
    }

    private resetColors = (): void => {
        this.previewColors = null;
        this.applyColor();
    }

    /**
     * Get a style tag
     * if it doesn't exist it will be creatd in the header part
     * @param id style tag id
     */
    private getColorStyleTag = (id: string): any => {
        const colorSelector = '#' + id;
        let colorStyle = $(colorSelector);
        if (colorStyle.length === 0) {
            $(document.head).append('<style id="' + id + '"></style>');
            colorStyle = $(colorSelector);
        }

        return colorStyle;
    }

    /**
     * Apply User colors
     * @private
     */
    private applyColor = (): void => {
        const colorStyle = this.getColorStyleTag('colors');
        let styleContent = '';
        this.colors.forEach((color: IColor) => {
            styleContent +=
                `${color.type} {
                    bgColor: ${color.backgroundColor};
                    color: ${color.textColor};
                }`;
        });
        colorStyle.html(styleContent);

        // If .preview exists
        if (this.previewColors) {
            const previewColorStyle = this.getColorStyleTag('preview_colors');
            styleContent =
                `.preview ${this.previewColors.type} {
                    bgColor: ${this.previewColors.backgroundColor};
                    color: ${this.previewColors.textColor};
                }`;
            previewColorStyle.html(styleContent);
        }
    }

}