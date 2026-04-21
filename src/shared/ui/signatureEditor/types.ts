export interface Props {
	onOK: (signature: string) => void;
	onClear: () => void;
	onBegin?: () => void;
	onEnd?: () => void;
	setIsDriwing: (type: boolean) => void;
}
