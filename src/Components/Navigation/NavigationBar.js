import {Grid} from "../Layouts/Grid";
import {Button} from "../Controls/Button";
import {Text, TEXT_STYLE} from "../Controls/Text";
import {Icon} from "../Controls/Icon";
import {EmptyView} from "../Presentation/EmptyView";
import {UpdatableView} from "../Presentation/UpdatableView";
import {HStack} from "../Layouts/Stack";
import {View} from "../View";
import "./NavigationBar.scss"
import {render_controller, Segment, } from "../..";

export const NavigationBar = () => ({
    ...View().addClass("navigation_bar"),
    title: "View title",
    backButtonLabel: "Back",
    leftItem: EmptyView(),
    rightItem: EmptyView(),
    _getBackButton () {
        if (history.state.view_stack_id > 0) {
            return Button(
                this.backButtonLabel,
                () => history.back())
                .addClass("button_back supplemented text")
                .setIcon(
                    Icon("navigation/chevron_left")
                        .setSize(36)
                )
        } else {
            return EmptyView();
        }
    },
    get children() {
        return [
            Grid({
                left_item: HStack(
                    this._getBackButton(),
                    this.leftItem
                ),
                right_item: this.rightItem,
                title: Text(this.title, TEXT_STYLE.large_title)
            })
                .gap(8, 24)
                .areas(`"left_item . right_item" "title title title"`)
                .columns("auto 1fr auto")
                .rows("36px auto")

        ]
    }
});
