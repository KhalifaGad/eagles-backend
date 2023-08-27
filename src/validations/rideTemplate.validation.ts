import * as yup from "yup";

export const rideTemplateSchema = yup
	.object()
	.shape({
		_id: yup.string().nullable(),
		name: yup.string().required(),
		steps: yup
			.array()
			.of(
				yup.object({
					sequence: yup.number().min(1).required(),
					stepLocationType: yup.mixed().oneOf(["Agency", "Hub"]).required(),
					stepLocationEntity: yup.string().required(),
				})
			)
			.min(3),
	})
	.noUnknown();
