<style id="colors">

  .classA {
  color:blue;
  ...
}

  input {
  color: red
}
</style>
<style id="preview">
  .preview input {
  color:green;
}

</style>

<body class="preview">

<input>

</body>

Class ColorParams {

  private static instance: ColorParams = null;

  private colors: Array<IColor> = [];
  private previewColors: ?IColor;

  public static getInstance() : ?ColorParams {
  return instance;
}

  public initColors(Array<IColor> colors) : void {
  this.instance = new ColorParams(colors);
}

  private applyColor(): void {
  let colorStyle = $('#colors');
  if (colorStyle.length === 0) {
  $(document.head).append('<style id="colors"></style>');
  colorStyle = $('#colors');
}

  let styleContent = '';
  colors.forEach((color: IColor) => {
  styleContent += `${color.type} {
			bgColor: ${color.bgColor};
			color: ${color.color};
			}`;
});

  previewColors.forEach((color: IColor) => {
  styleContent += `.preview ${color.type} {
			bgColor: ${color.bgColor};
			color: ${color.color};
			}`;
});

  colorStyle.html(styleContent);
}


  public applyPreviewColor(color: IColor): void {
  previewColors = color;
  applyColor();
}


  private constructor(private Array<IColor> colors) {
  applyColor();
}


  getColor(string type) : ?IColor {
  // forEach colors
}

  saveColor(color IColor): void {
  // Add / Replace type dans colors
  colors[X] = color;
  resetColors();
}

  resetColors(): void {
  previewColors = null;
  applyColor();
}

  setPreviewMode(bool enable): void {
  if (enable) {
  $(body).addClass('preview');
} else {
  $(body).removeClass('preview');
  resetColors();
}
}


}


