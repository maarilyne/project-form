import React, {FC} from 'react';
import ReactDOM from 'react-dom';
import {InputParams} from './Form/form-component';

export default class LoadComponent {
    /**
     * Load a new component/page
     * @param Component Component to load. It will replace all window content
     */
    public static load(Component: FC<any>): void {
        ReactDOM.render(<Component />, document.querySelector('#root'));
    }

    /**
     * Load a new component/page
     * @param Component Component to load. It will replace all window content
     */
    public static loadWithProps(Component: FC<any>, props: Array<InputParams>): void {
        ReactDOM.render(<Component />, document.querySelector('#root'));
    }

  /**
   * Load the panel color picker on div #sideComponent
   * @param Component
   */
  public static loadSideComponent(Component: FC<any>): void {
      ReactDOM.render(<Component />, document.querySelector('#sideComponent'));
  }
}
