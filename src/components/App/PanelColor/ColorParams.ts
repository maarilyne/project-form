export default class ColorParams {

    public initColor(): void {

    }

    public applyColor(idElement: string, idColor: string): void {
        const element = document.querySelector(idElement);
        // @ts-ignore
        element.classList.add('current');

        // @ts-ignore
        if (element.classList.contains('current')) {
            const elCurrent = document.querySelectorAll('.current');
            // elCurrent.style.backgroundColor = idColor
            elCurrent.forEach(function apply(item: any) {
                item.style.backgroundColor = idColor;
            });
        }
    }

    public cancelColor(): void {

    }
}
