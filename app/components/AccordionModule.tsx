import React from "react";
import type { AccordionModuleDataProps } from "~/api/api.types";
import { Accordion, INamedAccordionItem } from "./Accordion";
import { Grid } from "./Grid";
import MediaTextModule from "./MediaTextModule";
import { TextModule } from "./TextModule";
import { H3 } from "./Typography";

export interface IAccordionModuleProps extends AccordionModuleDataProps {
	children?: React.ReactNode;
	items: INamedAccordionItem[];
}

export const AccordionModule = ({ title, items }: IAccordionModuleProps) => {
	return (
		<Grid large>
			<H3>{title as string}</H3>
			<Accordion
				items={items}
				onRenderItem={(accordionItem) => {
					const item = accordionItem;
					if (item.textModule) {
						return <TextModule nested={true} {...item.textModule.props} />;
					}
					if (item.mediaModule) {
						return (
							<MediaTextModule
								nested={true}
								className="pb-[0.5rem]"
								{...item.mediaModule.props}
								{...item.mediaModule.references}
							/>
						);
					}
					return null;
				}}
			/>
		</Grid>
	);
};
