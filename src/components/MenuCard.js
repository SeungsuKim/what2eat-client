import { CheckCircleFilled, PlusCircleFilled } from "@ant-design/icons";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Modal, notification } from "antd";
import React, { useContext, useState } from "react";
import ScaleText from "react-scale-text";
import styled from "styled-components";

import { addMenuToVote } from "../db/Menu";
import { store } from "../store";

const MenuCard = ({
  menu,
  add,
  size = "default",
  rank,
  style,
  showTags,
  likedTags = [],
  excludedTags = [],
  isCalendarCard = false,
}) => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const { user, group, groups, menus } = state;

  const isMenuInVote = menus.map(({ menu }) => menu.id).includes(menu.id);

  const [calendarChecked, setCalendarChekced] = useState([]);

  const isMenuInGroupVote = (targetId) => {
    let val = false;

    for (let i = 0; i < groups.length; i++) {
      if (targetId === groups[i].id) {
        val = groups[i].menus.map(({ menu }) => menu.id).includes(menu.id);
        console.log("groupres", val, targetId, groups[i].id, menu);
        break;
      }
    }

    return val;
  };

  const [isCalendarModalOpened, setIsCalendarModalOpened] = useState(false);

  const addMenu = (id, groupName) => {
    if (!isCalendarCard) {
      if (!isMenuInVote) {
        dispatch({
          type: "ADD_MENU_TO_VOTE",
          payload: {
            menu,
            owner: user,
            viewedBy: [user],
            likedBy: [user],
            rejectedBy: [],
          },
        });
        addMenuToVote(menu, user, id);
        notification.open({
          message: "Successfully Added!",
          description: `${menu.menu} is successfully added to ${groupName}.`,
          icon: <CheckCircleOutlined style={{ color: "#52C41A" }} />,
        });
      } else {
        notification.open({
          message: "Error",
          description: `${menu.menu} is already added to ${groupName}.`,
          icon: <CloseCircleOutlined style={{ color: "rgb(255, 102, 99)" }} />,
        });
      }
    } else {
      if (!isMenuInGroupVote(id)) {
        dispatch({
          type: "ADD_MENU_TO_VOTE",
          payload: {
            menu,
            owner: user,
            viewedBy: [user],
            likedBy: [user],
            rejectedBy: [],
          },
        });
        addMenuToVote(menu, user, id);
        setCalendarChekced(calendarChecked.concat([id]));
        notification.open({
          message: "Successfully Added!",
          description: `${menu.menu} is successfully added to ${groupName}.`,
          icon: <CheckCircleOutlined style={{ color: "#52C41A" }} />,
        });
      } else {
        notification.open({
          message: "Error",
          description: `${menu.menu} is already added to ${groupName}.`,
          icon: <CloseCircleOutlined style={{ color: "rgb(255, 102, 99)" }} />,
        });
      }
    }
  };

  const handleAddMenu = () => {
    if (!isCalendarCard) {
      addMenu(group.id, group.group);
    } else {
      setIsCalendarModalOpened(true);
    }
  };

  const getRankText = (rank) => {
    switch (rank) {
      case 1:
        return "1st Place";
      case 2:
        return "2nd Place";
      case 3:
        return "3rd Place";
      default:
        return rank;
    }
  };

  return (
    <>
      <Modal
        title="Which group do you want to add this menu?"
        visible={isCalendarModalOpened}
        onCancel={() => setIsCalendarModalOpened(false)}
        footer={false}
        centered
      >
        {groups.map((g) => {
          const isInGroup = isMenuInGroupVote(g.id);
          console.log("isingroup", isInGroup, menu);

          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                padding: 10,
                marginBottom: 10,
              }}
            >
              <div>
                <span style={{ fontSize: 24 }}>{g.group}</span>
              </div>
              <div>
                {isInGroup || calendarChecked.includes(g.id) ? (
                  <CheckCircleFilled
                    style={{
                      color: "grey",
                      borderRadius: "50%",
                      fontSize: 40,
                    }}
                  />
                ) : (
                  <PlusCircleFilled
                    onClick={() => addMenu(g.id, g.group)}
                    style={{
                      color: "#13C2C2",
                      backgroundColor: "white",
                      borderRadius: "50%",
                      fontSize: 40,
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </Modal>
      <VoteCard>
        <MenuImage src={menu.image} />
        <MenuTitle>
          <ScaleText>
            <p style={{ margin: 0 }}>{menu.menu}</p>
          </ScaleText>
        </MenuTitle>
        {!isCalendarCard ? (
          <>
            {add && !isMenuInVote && (
              <PlusCircleFilled
                onClick={handleAddMenu}
                style={{
                  position: "absolute",
                  color: "#13C2C2",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  fontSize: 40,
                  right: 10,
                  bottom: 10,
                  ...style,
                }}
              />
            )}
            {add && isMenuInVote && (
              <CheckCircleFilled
                style={{
                  position: "absolute",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: 40,
                  right: 10,
                  bottom: 10,
                  ...style,
                }}
              />
            )}{" "}
          </>
        ) : (
          <PlusCircleFilled
            onClick={handleAddMenu}
            style={{
              position: "absolute",
              color: "#13C2C2",
              backgroundColor: "white",
              borderRadius: "50%",
              fontSize: 40,
              right: 10,
              bottom: 10,
              ...style,
            }}
          />
        )}
        {showTags && (
          <TagsContainer>
            {menu.tags.map((tag) => (
              <Tag liked={likedTags.map(({ tag }) => tag).includes(tag)}>
                # {tag}
              </Tag>
            ))}
          </TagsContainer>
        )}
        {rank && <Ribbon>{getRankText(rank)}</Ribbon>}
        {add && isMenuInVote && !isCalendarCard && (
          <Overlay>
            {size === "small" ? "Added" : "Successfully added to the vote!"}
          </Overlay>
        )}
      </VoteCard>
    </>
  );
};

const VoteCard = styled.div`
  border-radius: 10px;
  width: 100%;
  padding-bottom: 100%;
  position: relative;
  overflow: hidden;
`;

const Ribbon = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 40px;
  background-color: #13c2c2;
  color: white;
  font-size: 25px;
  font-weight: 600;
  text-align: center;
`;

const MenuImage = styled.img`
  position: absolute;
  height: 100%;
  object-fit: contain;
`;

const MenuTitle = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20%;
  text-align: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
  font-weight: 600;
  background-color: rgba(0, 0, 0, 0.5);
`;

const TagsContainer = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 15px;
  width: 85%;
`;

const Tag = styled.div`
  font-size: 15px;
  color: white;
  margin: 3px;
  background-color: ${(props) =>
    props.liked ? "rgba(19, 194, 194, 0.85)" : "rgba(0, 0, 0, 0.65)"};
  height: 25px;
  padding: 0px 10px;
  border-radius: 12.5px;
  text-align: center;
  vertical-align: center;
`;

export default MenuCard;
