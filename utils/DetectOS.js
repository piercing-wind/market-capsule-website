function detectOS() {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) {
    return false
  }
  else if (/iPad|iPhone|iPod/.test(ua)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
    return true
  }
  return false
};

function detectOS2(req) {
  const userAgent = req?.headers['user-agent'] || '';
  let userOS = false;
  if (userAgent.includes('Windows')) {
    userOS = false;
  } else if (userAgent.includes('Mac')) {
    userOS = false;
  } else if (userAgent.includes('Linux')) {
    userOS = false;
  } else if (userAgent.includes('Android')) {
    userOS = false;
  } else if (userAgent.includes('iOS')) {
    userOS = true;
  }
  return userOS;
};


export { detectOS , detectOS2};