import { atom, useAtom } from "jotai";

const friendsStatus = atom([
  { name: "John", online: true },
  { name: "David", online: false },
  { name: "Micheal", online: true },
]);

const onlineFriends = atom((get) => get(friendsStatus).map((item) => item));

const addFriendsAtom = atom(null, (get, set, newFriend: string) => {
  const friends = get(friendsStatus);
  set(friendsStatus, [...friends, { name: newFriend, online: true }]);
});

const useFriends = () => {
  const [friends] = useAtom(onlineFriends);
  const [, addFriend] = useAtom(addFriendsAtom);

  const onlineText = (online: boolean) => (online ? "온라인" : "오프라인");

  return { friends, addFriend, onlineText };
};

export default useFriends;
