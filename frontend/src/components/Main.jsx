import axios from "axios";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth.js";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../slices/index.js";
import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import NewMessage from "./NewMessage.jsx";
import { getCurrentChannel, getChannelsNames } from "../selectors.js";
import { DropdownModals, AddChannelModal } from "./modal.jsx";
import { socketApi } from "../index.jsx";
import { useTranslation } from "react-i18next";

const Channel = ({ name, isCurrent, id, isRemovable }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const variant = isCurrent ? "primary" : "secondary";
  const selectChannel = () => {
    dispatch(actions.changeChannel({ channelId: id }));
  };
  return (
    <li key={id} className="nav-item w-100">
      {isRemovable ? (
        <Dropdown as={ButtonGroup} className="w-100 d-flex rounded-0">
          <Button
            type="button"
            value={name}
            variant={variant}
            onClick={selectChannel}
            className="text-start text-truncate rounded-0"
          >
            <span className="me-1">{t("mainPage.channelThing")}</span>
            {name}
          </Button>
          <Dropdown.Toggle
            variant={variant}
            id="dropdown-split-basic"
            className="flex-grow-0 rounded-0"
          />
          <DropdownModals channelId={id} />
        </Dropdown>
      ) : (
        <Button
          type="button"
          className="w-100 text-start text-truncate btn d-flex rounded-0"
          value={name}
          variant={variant}
          onClick={selectChannel}
        >
          <span className="me-1">{t("mainPage.channelThing")}</span>
          {name}
        </Button>
      )}
    </li>
  );
};

const Message = ({ body, username }) => {
  return (
    <div className="text-brake mb-2">
      <b>{username}</b>: {body}
    </div>
  );
};

const Main = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = useAuth();
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const currentChannel = useSelector(getCurrentChannel);
  const { messages } = useSelector((state) => state.messages);
  const currentChannelMessages = messages.filter(
    (message) => message.channelId === currentChannelId
  );
  const channelsNames = useSelector(getChannelsNames);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios
        .get("/api/v1/data", {
          headers: auth.getAuthHeader(),
        })
        .catch((error) => console.log(error));
      dispatch(actions.createInitialState(res.data));
    };
    fetchData();
  }, []);
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <ul className="nav flex-column nav-pills nav-fill px-2">
            <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
              <span>{t("mainPage.channels")}</span>
              <AddChannelModal channelsNames={channelsNames} />
            </div>
            {channels.map((channel) => (
              <Channel
                key={channel.id}
                isCurrent={channel.id === currentChannelId}
                name={channel.name}
                id={channel.id}
                isRemovable={channel.removable}
              />
            ))}
          </ul>
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>{`${t("mainPage.channelThing")} ${currentChannel?.name}`}</b>
              </p>
              <span className="text-muted">
                {t("mainPage.messages", {
                  count: currentChannelMessages.length,
                })}
              </span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5">
              {currentChannelMessages.map(({ id, username, body }) => (
                <Message key={id} username={username} body={body} />
              ))}
            </div>
            <div className="mt-auto px-5 py-3">
              <NewMessage channel={currentChannel} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
