import {PieChart} from "@mui/x-charts"
export default function Storage() {
    return (
        <main className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
            <PieChart
                colors={["red","green","blue"]}
                series={
                    [
                        {
                        data:[
                                {
                                    value:10,
                                    label:"v1",
                                },
                                {
                                    value:15,
                                    label:"v2",
                                },
                                {
                                    value:20,
                                    label:"v3",
                                }
                            ],
                            cornerRadius:10,
                            innerRadius:10,
                            paddingAngle:5,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        },
                    ]
                }
                width={300}
                height={300}
            />
        </main>
    )
}
