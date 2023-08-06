import React from "react";

import PopupWithForm from "./PopupWithForm";

export default function ConfirmDeletePopup(props) {
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onDeleteCardConfirm(props.cardId);
  };
  
  return (
    <PopupWithForm
      name='delete'
      title='Вы уверены?'
      buttonText='Да'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isSending={props.isSending}
    />
   );
}