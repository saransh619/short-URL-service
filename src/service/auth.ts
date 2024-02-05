const sessionIdToUserMap = new Map();

function setUser(id: any, user: any) {
  sessionIdToUserMap.set(id, user);
}

function getUser(id: any) {
  return sessionIdToUserMap.get(id);
}

export {setUser, getUser};