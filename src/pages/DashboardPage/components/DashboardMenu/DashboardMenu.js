import AppsIcon from "@material-ui/icons/Apps";
import ChatIcon from "@material-ui/icons/Chat";
import DonutSmallIcon from "@material-ui/icons/DonutSmall";
import EventIcon from "@material-ui/icons/Event";
import FlagIcon from "@material-ui/icons/Flag";
import GroupIcon from "@material-ui/icons/Group";
import StarRateIcon from "@material-ui/icons/Star";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import VideogameAssetIcon from "@material-ui/icons/VideogameAsset";
import classNames from "classnames";
import Divider from "material-ui/Divider";
import List, {ListItem, ListItemIcon, ListItemText} from "material-ui/List";
import ListSubheader from "material-ui/List/ListSubheader";
import {withStyles} from "material-ui/styles";
import SvgIcon from "material-ui/SvgIcon";
import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {Link} from 'react-router-dom';

import {mapToObject} from "../../../../utils";

const styles = theme => ({
	root: {
		backgroundColor: theme.palette.background.paper
	},
	label: {
		fontSize: 14,
		fontWeight: 500,
		fontStyle: 'normal',
		lineHeight: 1.71,
		color: theme.palette.black_700
	},
	open: {
		paddingTop: 35
	},
	hide: {
		display: 'none'
	}
});

class DashboardMenu extends React.PureComponent {
	render() {
		const {classes, dashboardMenu} = this.props;

		return (
			<div className={classNames(!dashboardMenu.open && classes.open)}>
				<List component="nav">
					<ListSubheader
						className={classNames(!dashboardMenu.open && classes.hide)}
					>
						Отчеты
					</ListSubheader>
					<Divider/>
					<ListItem button>
						<ListItemIcon>
							<StarRateIcon/>
						</ListItemIcon>
						<ListItemText
							disableTypography={true}
							className={classes.label}
							primary="Сохранненые"
						/>
					</ListItem>

					<ListItem button>
						<ListItemIcon>
							<FlagIcon/>
						</ListItemIcon>
						<ListItemText
							disableTypography={true}
							className={classes.label}
							primary="События"/>
					</ListItem>

					<ListItem button>
						<ListItemIcon>
							<GroupIcon/>
						</ListItemIcon>
						<ListItemText
							disableTypography={true}
							className={classes.label}
							primary="Аудитория"/>
					</ListItem>

					<ListItem button>
						<ListItemIcon>
							<SvgIcon>
								<path d="M 3 2 L 3 4 L 9 12 L 15 12 L 21 4 L 21 2 Z M 9 13 L 9 19 L 15 22 L 15 13 Z "></path>
							</SvgIcon>
						</ListItemIcon>
						<ListItemText
							disableTypography={true}
							className={classes.label}
							primary="Воронки"/>
					</ListItem>

					<Link to="/dashboard/retention">
						<ListItem button>
							<ListItemIcon>
								<AppsIcon/>
							</ListItemIcon>
							<ListItemText
								disableTypography={true}
								className={classes.label}
								primary="Retention"/>
						</ListItem>
					</Link>

					<ListItem button>
						<ListItemIcon>
							<VideogameAssetIcon/>
						</ListItemIcon>
						<ListItemText
							disableTypography={true}
							className={classes.label}
							primary="Push-кампания"/>
					</ListItem>

					<ListItem button>
						<ListItemIcon>
							<ChatIcon/>
						</ListItemIcon>
						<ListItemText
							disableTypography={true}
							className={classes.label}
							primary="Telegram бот"/>
					</ListItem>

					<ListItem button>
						<ListItemIcon>
							<SwapHorizIcon/>
						</ListItemIcon>
						<ListItemText
							disableTypography={true}
							className={classes.label}
							primary="А/В тесты"/>
					</ListItem>

					<ListSubheader
						className={classNames(!dashboardMenu.open && classes.hide)}
					>
						Данные
					</ListSubheader>
					<Divider/>

					<ListItem button>
						<ListItemIcon>
							<EventIcon/>
						</ListItemIcon>
						<ListItemText
							disableTypography={true}
							className={classes.label}
							primary="Календарь активностей"/>
					</ListItem>

					<ListItem button>
						<ListItemIcon>
							<DonutSmallIcon/>
						</ListItemIcon>
						<ListItemText
							disableTypography={true}
							className={classes.label}
							primary="Мои сегменты"/>
					</ListItem>
				</List>
			</div>
		);
	}
}

export default compose(
	connect((state) => {
		return {
			dashboardMenu: mapToObject(state.get('dashboardMenu')),
			route: mapToObject(state.get('route')),
			dispatch: state.dispatch
		};
	}),
	withStyles(styles)
)(DashboardMenu);