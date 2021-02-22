import $ from 'jquery';
import {SaveColor} from '../Form/Login/SaveColor';

export interface IColor {
  textColor: string;
  backgroundColor: string;
  type: string;
}

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
  public initColors(colors: Array<IColor>): void {
      this.colors = colors;
      this.applyColor();
  }

  public getInitColors(): void {
    const serverColor = new SaveColor();
    serverColor.getDataColors((colors: Array<IColor>): void => {
      this.initColors(colors);
    });
  }

  /**
   * récupère les couleurs sélectionnées via le picker
   * @param type
   */
  public getColor(type: string): IColor {
    /*let colorObject: IColor | null = null;

    this.colors.forEach((oldColorObject: IColor) => {
      if (oldColorObject.type === type) {
        colorObject = oldColorObject;
      }
    });
    if (colorObject === null) {
      colorObject = {
        type,
        backgroundColor: 'white',
        textColor: 'black',
      };
    }
    return colorObject;
    */

    for (const key in this.colors) {
      if (this.colors[key].type === type) {
        return this.colors[key];
      }
    }

    return {
      type,
      backgroundColor: 'white',
      textColor: 'black',
    };
  }

  /**
   * Get colors changed by user
   * - Apply new colors in CSS part
   * - Send new colors to server (only changed object is sent)
   * Adds / Replaces type in "colors"
   * @param color
   */
  public saveColor(color: IColor): void {
    const newColors: Array<IColor> = [];
    newColors.push(color);
    this.colors.forEach((oldColor: IColor) => {
      if (oldColor.type !== color.type) {
        newColors.push(oldColor);
      }
    });
    this.colors = newColors;
    this.saveColorIntoDatabase(color);
  }

  /**
   * Saves the colors in the file colorsData.json
   * Sends the colors to be saved to the server by calling the object 'SaveColor'
   * @param color
   * @private
   */
  private saveColorIntoDatabase = (color: IColor): void => {
    const saveColor = new SaveColor();
    saveColor.save(color);
  }

  /**
   * Apply a preview color
   * - Force preview mode before applying preview colors
   * @param color
   */
  public applyPreviewColor = (color: IColor): void => {
    this.openPreviewMode();
    this.previewColors = color;
    this.applyColor();
  }

  /**
   * Ouvre la preview
   */
  public openPreviewMode = (): void => {
    this.setPreviewMode(true);
  }

  /**
   * Ferme la preview
   */
  public closePreviewMode = (): void => {
    this.setPreviewMode(false);
  }

  private setPreviewMode = (enable: boolean): void => {
    if (enable) {
      $(document.body).addClass('preview');
    } else {
      $(document.body).removeClass('preview');
      this.resetColors();
    }
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
   * If a style tag with an id called 'colors' exists : we apply the colors inside the CSS style of this tag
   * If a style tag with an id called 'preview_colors' exists: we apply the colors inside the CSS style of this tag
   * @private
   */
  private applyColor = (): void => {
    const colorStyle = this.getColorStyleTag('colors');
    let styleContent = '';
    this.colors.forEach((color: IColor) => {
      styleContent += this.getColorCssEntry(color);
    });
    colorStyle.html(styleContent);
    if (this.previewColors) {
      const previewColorStyle = this.getColorStyleTag('preview_colors');
      styleContent = `.preview ${this.getColorCssEntry(this.previewColors)}`;
      previewColorStyle.html(styleContent);
    }
  }

  /**
   * Applique le CSS sur le background et le texte
   * @param colorsPattern : objet contenant les infos au type édité (couleurs du texte et du fond...)
   * @private
   */
  private getColorCssEntry = (colorsPattern: IColor): string => {
    return `${colorsPattern.type} {
                background-color: ${colorsPattern.backgroundColor};
                color: ${colorsPattern.textColor};
            }`;
  }
}
