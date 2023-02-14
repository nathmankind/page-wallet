import React, { Children, FunctionComponent, useRef } from "react";
import useOnClickOutside from "../../hooks/useClickOutside";

interface ModalPropsInterface {
	onClick?: () => void;
	children: React.ReactNode;
	open:boolean;
}

const Modal: FunctionComponent<ModalPropsInterface> = ({ children, onClick = () => {}, open }) => {
	const modalRef = useRef<any>();

	useOnClickOutside(modalRef, () => {
		onClick();
	});

	return (
		<>
		{open && (
			<div className="modal-background fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-70 z-50">
			<div className="flex items-end md:items-center justify-around min-w-44 h-screen">
				<div
					ref={modalRef}
					className="modal items-center align-middle max-w-2xl md:-mt-48 bg-white rounded"
				>
					
					<div className="modal-body p-5">{children}</div>
				</div>
			</div>
		</div>
		)}
		</>
		
	);
};

export default Modal;
