import {
    Button,
    Grid,
    Image,
    List,
    NavigationButton,
    NavigationView,
    render_controller,
    Segment,
    Text,
    TEXT_STYLE,
    VStack,
    NavigationBar,
    View
} from "UIKit";

const ContactRow = (item) => NavigationButton(`/contact/${item.id}`,
    Grid({
        img: Image("https://cdn.mgig.fr/2019/06/mg-818a12f0-e85c-4c65-aeef-w1000h562-sc.jpg")
            .cornerRadius(16)
            .size(32, 32),
        text: VStack(
            Text(item.name, TEXT_STYLE.label),
            Text(item.email, TEXT_STYLE.subheadline)
        ),
        action: Button("Delete", () => {}, "outlined", "red")
    })
        .columns("auto auto 1fr auto")
        .areas(`"img text . action"`)
        .alignItems("center")
        .gap(12)
);

export default (users) => NavigationView(
    "Contacts",
    () => View(
        NavigationBar({
            title: "Contacts",
            rightItem: Segment(
                value => render_controller.setTheme(value),
                {
                    value: "dark",
                    label: Text("Dark", TEXT_STYLE.label)
                },
                {
                    value: "light",
                    label: Text("Light", TEXT_STYLE.label)
                }
            )
                .select(render_controller.theme)
        }),
        List(users, ContactRow)
    )
)
