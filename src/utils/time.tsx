import SvgIcon from '@/components/SvgIcon'

interface GreetingProps {
  timeMsg: string
  timeIcon: React.ReactNode
}

const greeting = (): GreetingProps => {
  const hour = new Date().getHours()
  if (hour > 6 && hour <= 8) {
    return {
      timeMsg: '早上好',
      timeIcon: <SvgIcon iconName="sunrise" width="25px" height="25px" />,
    }
  } else if (hour > 8 && hour <= 11) {
    return {
      timeMsg: '上午好',
      timeIcon: <SvgIcon iconName="sunny" width="25px" height="25px" />,
    }
  } else if (hour > 11 && hour <= 13) {
    return {
      timeMsg: '中午好',
      timeIcon: <SvgIcon iconName="midday" width="25px" height="25px" />,
    }
  } else if (hour > 13 && hour <= 18) {
    return {
      timeMsg: '下午好',
      timeIcon: <SvgIcon iconName="sunset" width="25px" height="25px" />,
    }
  } else if (hour > 18 && hour <= 22) {
    return {
      timeMsg: '晚上好',
      timeIcon: <SvgIcon iconName="moon" width="25px" height="25px" />,
    }
  } else if (hour > 22 || hour <= 1) {
    return {
      timeMsg: '不早了, 早点休息',
      timeIcon: <SvgIcon iconName="moon-night" width="25px" height="25px" />,
    }
  } else {
    return {
      timeMsg: '夜深了, 洗洗睡吧',
      timeIcon: <SvgIcon iconName="moon-night" width="25px" height="25px" />,
    }
  }
}

export default greeting
