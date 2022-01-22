import React, {useEffect, useRef, useState} from "react";

export const AutocompleteInput = (props) => {

  const [activeItem, setActiveItem] = useState(-1);
  const [showItems, setShowItems] = useState(false);
  const [items, setItems] = useState([]);

  const inputRef = useRef(null);

  const loadData = () => {
    if (props.value.length < 3) {
      return;
    }

    // TODO delay + abort previous
    props.loadItems({query: props.value})
      .then(data => {
        setItems(data);
      })
      .catch(e => {
        console.error(e);
      });
  }

  useEffect(loadData, [props]);

  const update = (value, finished) => {
    setActiveItem(-1);
    setShowItems(!finished);
    props.onChange(value, finished);
  }

  const onChange = (e) => {
    update(e.target.value, false);
  };

  const onClick = (e) => {
    update(e.target.innerText, true);
  };

  const onKeyDown = (e) => {
    switch (e.key) {
      case "Enter":
        update(activeItem >= 0 ? props.getText(items[activeItem]) : e.target.value, true);
        break;
      case "ArrowUp":
        if (activeItem === -1) {
          return;
        }
        setActiveItem(activeItem - 1);
        break;
      case "ArrowDown":
        if (activeItem + 1 === items.length) {
          return;
        }
        setActiveItem(activeItem + 1);
        break;
    }
  };

  return (
    <>
      <input ref={inputRef}
             type="text"
             className={props.className}
             value={props.value}
             onChange={onChange}
             onKeyDown={onKeyDown}
             onMouseEnter={() => setActiveItem(-1)}/>

      {showItems && items.length &&
      <div className="suggestions" style={{width: inputRef.current.clientWidth}}>
        {items.map((item, index) => {
          return (
            <span key={index}
                className={index === activeItem ? "suggestion-active" : ""}
                onClick={onClick}
                onMouseEnter={() => setActiveItem(index)}>
              {props.getText(item)}
            </span>
          );
        })}
      </div>
      }
    </>
  );
}
