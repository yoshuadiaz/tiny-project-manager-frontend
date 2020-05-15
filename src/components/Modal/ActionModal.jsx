import React from 'react'
import { Modal, ModalContent, ModalHeader } from 'semantic-ui-react'
const ActionModal = (props) => {
  const {
    isOpen,
    onClose,
    children,
    title
  } = props
  return (
    <Modal open={isOpen} onClose={onClose} size='small' closeIcon>
      <ModalHeader>
        {title}
      </ModalHeader>
      <ModalContent>
        {children}
      </ModalContent>
    </Modal>
  )
}

export default ActionModal
