const Joi=require('joi')

module.exports=Joi.object({
    title:Joi.string().min(5).max(50).regex(/[$\(\)<>]/, { invert: true }).required(),
    description:Joi.string().max(500).required(),
    main_image:Joi.required(),
    date_time:Joi.date().timestamp('unix').required(),
    additional_images:Joi.array()
})