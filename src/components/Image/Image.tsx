import React from 'react';
import cn from 'classnames';
// import { CircularProgress, FontIcon } from 'react-md';
import { mdiSyncCircle, mdiImageBroken } from '@mdi/js';
import Icon from '@mdi/react';

import s from './Image.css';

interface Image {
  defaultProps: Props;
  image: any;
  toggle: any;
}

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Alt attribute to show placeholder text */
  // alt: string;
  /** Duration of the fading animation, in milliseconds. */
  animationDuration?: number;
  /** Override aspect ratio. */
  aspectRatio?: number;
  /** Override the default <img> and put any children tags in place of it */
  children?: React.ReactNode;
  /** Overrides the default className */
  className?: string;
  /** Override the background color. */
  color?: string;
  /** Override the crossorigin attribute */
  crossOrigin?: 'anonymous' | 'use-credentials';
  /** Disables the error icon if set to true. */
  disableError?: boolean;
  /** Disables the loading spinner if set to true. */
  disableSpinner?: boolean;
  /** Disables the transition after load if set to true. */
  disableTransition?: boolean;
  /** Override the error icon. */
  errorIcon?: React.ReactNode;
  /** Override the inline-styles of the image. */
  imageStyle?: object;
  /** Override the loading component. */
  loadingIcon?: React.ReactNode;
  /** Fired when the user clicks on the image happened. */
  onClick?: (event?: React.MouseEvent<HTMLDivElement>) => void;
  /** Fired when the image failed to load. */
  onError?: (event?: React.SyntheticEvent<HTMLImageElement>) => void;
  /** Fired when the image finished loading. */
  onLoad?: (event?: React.SyntheticEvent<HTMLImageElement>) => void;
  /** Specifies the URL of an image. */
  src: string;
  /** Override the inline-styles of the root element. */
  style?: object;
}

interface ChildProps {
  /** Alt attribute to show placeholder text */
  alt?: string;
  /** Duration of the fading animation, in milliseconds. */
  animationDuration?: number;
  /** Override aspect ratio. */
  aspectRatio?: number;
  /** Override the default <img> and put any children tags in place of it */
  children?: React.ReactNode;
  /** Overrides the default className */
  className?: string;
  /** Override the background color. */
  color?: string;
  /** Override the crossorigin attribute */
  crossOrigin?: 'anonymous' | 'use-credentials';

  decoding?: 'async';
  /** Disables the error icon if set to true. */
  disableError?: boolean;
  /** Disables the loading spinner if set to true. */
  disableSpinner?: boolean;
  /** Disables the transition after load if set to true. */
  disableTransition?: boolean;
  /** Override the error icon. */
  errorIcon?: React.ReactNode;
  /** Override the inline-styles of the image. */
  imageStyle?: object;
  /** Override the loading component. */
  loadingIcon?: React.ReactNode;
  /** Fired when the user clicks on the image happened. */
  onClick?: (event?: React.MouseEvent<HTMLDivElement>) => void;
  /** Fired when the image failed to load. */
  onError?: (event?: React.SyntheticEvent<HTMLImageElement>) => void;
  /** Fired when the image finished loading. */
  onLoad?: (event?: React.SyntheticEvent<HTMLImageElement>) => void;

  ref?: React.Ref<Image>;
  /** Specifies the URL of an image. */
  src?: string;
  /** Override the inline-styles of the root element. */
  style?: object;

  toggle?: any;
}

interface State {
  imageError: boolean;
  imageLoaded: boolean;
  src: string;
}

export const media1x = '(max-width: 799px)';

export const media2x = `
(min-width: 800px) or
(-webkit-min-device-pixel-ratio: 2),
(min--moz-device-pixel-ratio: 2),
(-o-min-device-pixel-ratio: 2),
(min-device-pixel-ratio: 2),
(min-resolution: 192dpi),
(min-resolution: 2dppx)
`
  .trim()
  .replace(/\n/g, ' ');

export const media3x = `
(min-width: 2600px) or
(-webkit-min-device-pixel-ratio: 3),
(min--moz-device-pixel-ratio: 3),
(-o-min-device-pixel-ratio: 3),
(min-device-pixel-ratio: 3),
(min-resolution: 288dpi),
(min-resolution: 3dppx)
`
  .trim()
  .replace(/\n/g, ' ');

/**
 * Images are ugly until they're loaded. Materialize it with material image! It will fade in like the material image loading pattern suggests.
 * @see [Image loading patterns](https://material.io/guidelines/patterns/loading-images.html)
 * Based on https://github.com/TeamWertarbyte/material-ui-image/
 */
class Image extends React.PureComponent<Props, any> {
  static defaultProps = {
    animationDuration: 3000,
    aspectRatio: 1,
    children: null,
    color: '#fff',
    crossOrigin: 'anonymous',
    disableError: false,
    disableSpinner: false,
    disableTransition: false,
    errorIcon: (
      <Icon
        className={cn('md-icon material-icons', s.errorIcon)}
        path={mdiImageBroken}
      />
    ),
    imageStyle: {},
    loadingIcon: null,
    onClick: null,
    style: {},
  };

  constructor(props: Props) {
    super(props);
    this.image = React.createRef();
    this.state = {
      imageError: false,
      imageLoaded: false,
      src: props.src,
    };
  }

  componentDidMount() {
    const img = this.image.current;
    if (img && img.complete) this.handleLoadImage();
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (state.src !== props.src) {
      return {
        imageError: false,
        imageLoaded: false,
        src: props.src,
      };
    }
    return null;
  }

  componentWillUnmount() {
    this.image = null;
  }

  getStyles = () => {
    const {
      animationDuration,
      aspectRatio,
      color,
      disableTransition,
      imageStyle,
      style,
    } = this.props;

    const imageTransition = !disableTransition && {
      opacity: this.state.imageLoaded ? 1 : 0,
      filterBrightness: this.state.imageLoaded ? 100 : 0,
      filterSaturate: this.state.imageLoaded ? 100 : 20,
      transition: `
        filterBrightness ${animationDuration *
          0.75}ms cubic-bezier(0.4, 0.0, 0.2, 1),
        filterSaturate ${animationDuration}ms cubic-bezier(0.4, 0.0, 0.2, 1),
        opacity ${animationDuration / 2}ms cubic-bezier(0.4, 0.0, 0.2, 1)
      `,
    };

    const styles = {
      root: {
        backgroundColor: color,
        paddingTop: `calc(${aspectRatio} * 100%)`,
        ...style,
      },
      image: {
        ...imageTransition,
        ...imageStyle,
      },
    };

    return styles;
  };

  handleLoadImage = () => {
    this.setState((state: State) => ({ ...state, imageLoaded: true }));
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  };

  handleImageError = () => {
    if (this.props.src) {
      this.setState((state: State) => ({ ...state, imageError: true }));
    }
    if (this.props.onError) {
      this.props.onError();
    }
  };

  recursiveCloneChildren = (children: React.ReactNode | React.ReactNodeArray) =>
    React.Children.map(children, child => {
      if (!React.isValidElement(child)) return child;
      // const props = { ...{ className: '' }, ...child.props };
      let childProps = {} as ChildProps;
      if (React.isValidElement(child)) {
        if (child.type === 'picture') {
          childProps = {
            className: s.image,
          };
        }
        if (child.type === 'img') {
          childProps = {
            alt: this.props.alt,
            decoding: 'async',
            onError: this.handleImageError,
            onLoad: this.handleLoadImage,
            ref: this.image,
            src: this.props.src,
            style: this.getStyles().image,
            toggle: this.toggle,
          };
        }
      }
      childProps.children = this.recursiveCloneChildren(child.props.children);
      return React.cloneElement(child, childProps);
    });

  render() {
    const styles = this.getStyles();

    // const { imageError, imageLoaded } = this.state;
    const {
      alt,
      aspectRatio,
      children,
      className,
      color,
      disableError,
      disableSpinner,
      disableTransition,
      errorIcon,
      imageStyle,
      style,
      onClick,
      ...image
    } = this.props;
    let { loadingIcon } = this.props;

    if (!loadingIcon) {
      loadingIcon = (
        <Icon className="md-icon material-icons" path={mdiSyncCircle} spin />
      );
    }

    delete image.animationDuration;

    if (children) {
      return (
        <div
          className={cn(s.root, className)}
          onClick={onClick}
          role="presentation"
          style={styles.root}
        >
          {this.recursiveCloneChildren(children)}
          <div className={s.container}>
            <div className={s.spinner}>
              {!disableSpinner &&
                !this.state.imageLoaded &&
                !this.state.imageError &&
                loadingIcon}
              {!disableError && this.state.imageError && errorIcon}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        className={s.root}
        onClick={onClick}
        role="presentation"
        style={styles.root}
      >
        {image.src && (
          <img
            {...image}
            alt={alt}
            decoding="async"
            className={s.image}
            ref={this.image}
            style={styles.image}
            onLoad={this.handleLoadImage}
            onError={this.handleImageError}
          />
        )}
        <div className={s.container}>
          <div className={s.spinner}>
            {!disableSpinner &&
              !this.state.imageLoaded &&
              !this.state.imageError &&
              loadingIcon}
            {!disableError && this.state.imageError && errorIcon}
          </div>
        </div>
      </div>
    );
  }
}

export default Image;
