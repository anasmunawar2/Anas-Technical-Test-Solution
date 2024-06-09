"use client";

import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvided,
  DroppableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { Item } from "../types";
import { initialItems } from "../data";

const DraggableList: React.FC = () => {
  const [items, setItems] = useState<Item[]>(initialItems);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setItems(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="items">
        {(provided: DroppableProvided) => (
          <ul
            className="w-full max-w-md mx-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {items.map(({ id, title, location, img }, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(
                  provided: DraggableProvided,
                  snapshot: DraggableStateSnapshot
                ) => (
                  <>
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`group flex items-center p-4 bg-white shadow-sm transition-transform ${
                        snapshot.isDragging ? "opacity-50" : ""
                      } ${
                        snapshot.isDragging ? "border-b-2 border-blue-500" : ""
                      } hover:opacity-70`}
                    >
                      <div className="w-16 h-16 relative rounded overflow-hidden">
                        <img
                          src={img}
                          alt={title}
                          className="rounded-lg w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <h3 className="text-md font-semibold">{title}</h3>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img
                              src="/icon.png"
                              alt="Icon"
                              className="w-3 h-4 mr-1"
                            />
                            <p className="text-gray-400 text-sm">{location}</p>
                          </div>
                          <div className="hidden group-hover:block">
                            <EllipsisHorizontalIcon className="h-6 w-6 text-black" />
                          </div>
                        </div>
                      </div>
                    </li>
                    {snapshot.isDragging && (
                      <div
                        className="fixed pointer-events-none z-50"
                        style={{
                          top: `calc(50% + ${
                            provided.draggableProps.style?.transform?.match(
                              /translateY\((.*)px\)/
                            )?.[1] || 0
                          }px)`,
                          left: `calc(50% + ${
                            provided.draggableProps.style?.transform?.match(
                              /translateX\((.*)px\)/
                            )?.[1] || 0
                          }px)`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <div
                          className="flex items-center p-2 bg-white rounded-lg shadow-lg"
                          style={{ width: 200 }}
                        >
                          <div className="w-12 h-12 relative rounded overflow-hidden">
                            <img
                              src={img}
                              alt={title}
                              className="rounded-lg w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-2">
                            <h3 className="text-sm font-semibold">{title}</h3>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableList;
