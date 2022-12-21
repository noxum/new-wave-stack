import Collapse, { Panel } from "rc-collapse";
import React from "react";
import { twMerge } from "tailwind-merge";
import { IMediaTextModule, ITextModule } from "~/api/api.types";
import motion from "./util";

export interface INamedAccordionItem {
	id: number;
	title: string;
	className?: string;
	mediaModule?: IMediaTextModule;
	textModule?: ITextModule;
}

export interface IAccordionProps {
	items: INamedAccordionItem[];
	onRenderItem: (item: INamedAccordionItem) => JSX.Element | null;
}

function Accordion({ items, onRenderItem }: IAccordionProps) {
	const [activeKey, setActiveKey] = React.useState<React.Key | React.Key[]>(0);
	const onChange = (key: React.Key | React.Key[]) => {
		setActiveKey(key);
	};

	const arrowPath =
		"M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88" +
		".5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3." +
		"6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-0.7 5." +
		"2-2L869 536.2c14.7-12.8 14.7-35.6 0-48.4z";

	function expandIcon(item: object) {
		const aItem = item as INamedAccordionItem & { isActive: boolean };
		return (
			<i style={{ marginRight: ".5rem", display: "inline-block" }}>
				<svg
					viewBox="0 0 1024 1024"
					width="1em"
					height="1em"
					fill="currentColor"
					style={{
						verticalAlign: "-.125em",
						transition: "transform .2s",
						transform: `rotate(${aItem?.isActive ? 90 : 0}deg)`,
					}}
				>
					<path d={arrowPath} p-id="5827" />
				</svg>
			</i>
		);
	}

	return (
		<Collapse
			accordion={false}
			onChange={onChange}
			activeKey={activeKey}
			expandIcon={expandIcon}
			openMotion={motion}
		>
			{items.map((accordionItem) => {
				const panelCls = twMerge(
					accordionItem.className,
					"bg-gradient-to-r from-teal-700 to-teal-500 rounded-sm mb-[0.2rem] p-2 flex text-white text-lg"
				);
				return (
					<Panel header={accordionItem.title} key={accordionItem.id} headerClass={panelCls}>
						{onRenderItem(accordionItem)}
					</Panel>
				);
			})}
		</Collapse>
	);
}

export { Accordion };
