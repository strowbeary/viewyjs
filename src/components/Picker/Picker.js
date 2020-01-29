import {View} from "../View";
import "./Picker.scss"
import {Text, TEXT_STYLE} from "../Text/Text";
import {HStack, VStack} from "../Stack/Stack";
import {S} from "../../ressources/SizingScale";

export const Picker = (label, name, action = () => {
}, selectedItemValue, ...items) => {
    let pickerStyle = "segmented";

    function SegmentedPicker () {
        return items.map(({value, label: optionLabel}) => ({
            ...View()
                .onClick(() => action(value)),
            classList: {
                item: true,
                selected: value === selectedItemValue
            },
            children: [Text(optionLabel, TEXT_STYLE.button)],
        }))
    }

    function DropdownPicker () {
        return VStack(
            Text(label, TEXT_STYLE.label),
            View(
                View(
                    ...items.map(({value, label: optionLabel}) => {
                        const option = Text(optionLabel, TEXT_STYLE.label)
                            .tagName("option")
                            .onClick(() => action(value));
                        if(value === selectedItemValue) option.addClass("selected");
                        return option;
                    })
                )
                    .tagName("select")
            )
                .addClass("dropdown")
        )
            .gap(S(2));;
    }

    function RadioGroupPicker () {
        return VStack(
            Text(label, TEXT_STYLE.label),
            ...items.map(({value, label: optionLabel}, i) => {
                const input = View()
                    .tagName("input")
                    .setAttribute("type", "radio")
                    .setAttribute("name", name)
                    .setAttribute("id", `picker-radio-${name}-${optionLabel}`)
                    .setAttribute("onchange", () => action(value));
                if (value === selectedItemValue) {
                    input.setAttribute("checked", true);
                }

                const radio = HStack(
                    input,
                    Text(optionLabel, TEXT_STYLE.body2, "label")
                        .setAttribute("for", `picker-radio-${name}-${optionLabel}`)
                )
                    .addClass("radio")
                    .alignItems("center")
                    .gap(S(2));

                return radio;
            })
        )
            .gap(S(2));
    }

    return {
        ...View()
            .addClass("picker"),
        padding () {
            throw Error("padding can't be set on Segment view");
        },
        segmentedStyle () {
            pickerStyle = "segmented";
            return this;
        },
        dropdownStyle () {
            pickerStyle = "dropdown";
            return this;
        },
        radioGroupStyle () {
            pickerStyle = "radioGroup";
            return this;
        },
        disable (disabled) {
            if (disabled) this.setAttribute("disabled", "disabled");
            return this;
        },
        get children () {
            switch (pickerStyle) {
                case "radioGroup":
                    return [RadioGroupPicker()];
                case "dropdown":
                    return [DropdownPicker()];
                default:
                case "segmented":
                    return SegmentedPicker();
            }
        }
    }
};
