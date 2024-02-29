import Image from 'next/image';
import React, { useMemo } from 'react';
interface IAvatarProps {
  src: string;
  size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  alt?: string;
  circle?: boolean;
  className?: string;
}
const Avatar = (props: IAvatarProps) => {
  const { src, size, alt, circle, className } = props;
  const { avatarWidth, avatarHeight } = useMemo(() => {
    switch (size) {
      case 'xxs':
        return { avatarWidth: 24, avatarHeight: 24 };
      case 'xs':
        return { avatarWidth: 32, avatarHeight: 32 };
      case 'sm':
        return { avatarWidth: 48, avatarHeight: 48 };
      case 'md':
        return { avatarWidth: 72, avatarHeight: 72 };
      case 'lg':
        return { avatarWidth: 96, avatarHeight: 96 };
      case 'xl':
        return { avatarWidth: 120, avatarHeight: 120 };
    }
  }, []);

  return (
    <Image
      src={src}
      alt={alt || ''}
      width={avatarWidth}
      height={avatarHeight}
      className={`rounded ${circle && 'rounded-circle'} ${className}`}
    />
  );
};

export default Avatar;
