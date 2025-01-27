import React from 'react'

// 传值要求
interface Props {
  iconName: string
  color?: string
  // icon width
  width?: string
  height?: string
  prefixName?: string
}

const SvgIcon: React.FC<Props> = ({
  iconName,
  color,
  width = '16px',
  height = '16px',
  prefixName = 'icon',
}) => {
  return (
    <div className="svg-icon">
      <svg style={{ width, height }}>
        <use xlinkHref={`#${prefixName}-${iconName}`} fill={color} />
      </svg>
    </div>
  )
}

export default SvgIcon
