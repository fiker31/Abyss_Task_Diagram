import { FC, useEffect, useRef, useState } from "react";
import { INode } from "../../models/INode";

import "./index.css";
import { symbols } from "../../constans/symbols";
import { Modal } from "../Modal";

export const Node: FC<{
  node: INode;
  isChild: boolean;
  onDelete?: (node: INode) => void;
}> = ({ node, isChild, onDelete }) => {
  const [value, setValue] = useState(node.value);
  const [children, setChildren] = useState(node.children);
  const [isEdit, setIsEdit] = useState(!node.value);
  const [showAdditionOptions, setShowAdditionOptions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && !inputRef.current.value) {
      inputRef.current.focus();
    }
  }, []);

  const toggleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const onSave = () => {
    node.value = value;
    toggleEdit();
  };

  const onCancel = () => {
    setValue(node.value);
    toggleEdit();
  };

  const onAdd = () => {
    const newNode = { value: "", children: [], id: `${Date.now()}` };
    setChildren([...children, newNode]);
    node.children.push(newNode);
  };

  const handleDelete = (removeNode: INode) => {
    node.children = node.children.filter((n) => n !== removeNode);
    setChildren(node.children);
  };

  const controls = isEdit ? (
    <div className="form_controls">
      <button onClick={onSave} className="ctrl ctrl_success">
        {symbols.done}
      </button>
      <button onClick={onCancel} className="ctrl ctrl_danger">
        {symbols.cancel}
      </button>
    </div>
  ) : (
    <div className="form_controls">
      <button
        onClick={() => (isChild ? setShowAdditionOptions(true) : onAdd())}
        className="ctrl"
      >
        {symbols.plus}
      </button>
      <button className="ctrl" onClick={toggleEdit}>
        {symbols.edit}
      </button>
      {onDelete && (
        <button onClick={() => onDelete(node)} className="ctrl ctrl_danger">
          {symbols.minus}
        </button>
      )}
    </div>
  );

  return (
    <div draggable={false} className="node">
      {isChild && <div className="sibling_connection" />}
      <div className="node_value_wrapper">
        <div
          className={`box node_value ${children.length && "node_value_parent"}`}
        >
          {isChild && <div className="child_connection" />}
          {!!children.length && <div className="parent_connection" />}
          {isEdit ? (
            <input
              ref={inputRef}
              className="edit_input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          ) : (
            value
          )}
        </div>
        {controls}
        {showAdditionOptions && (
          <Modal
            hideShowModal={() => setShowAdditionOptions(false)}
            onAdd={onAdd}
          />
        )}
      </div>
      <div className="childrens">
        {children.map((n) => (
          <Node onDelete={handleDelete} key={n.id} isChild node={n} />
        ))}
      </div>
    </div>
  );
};
