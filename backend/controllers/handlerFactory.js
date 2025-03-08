const catchAsync = require('../utils/catchAsync')
     // read the fileh
     const fs = require('fs')
     const path = require('path')
const AppError = require('../utils/appError')

// eslint-disable-next-line import/no-dynamic-require
const APIFeatures = require(__dirname + '/../utils/apiFeatures')

//Fix:  Delete documents from DB based on id provided in url
exports.deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    // eslint-disable-next-line no-unused-vars
    const doc = await Model.findByIdAndDelete(req.params.id)

    if (!doc) {
      return next(
        new AppError('Could not found document with ID: ' + req.params.id, 404)
      )
    }
    res.status(204).json({
      status: 'success',
      data: null,
    })
  })
}

// Fix: Update documents from DB based on ID provided in the URL
exports.updateOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      // runValidators: true
    });

    if (!doc) {
      return next(
        new AppError(
          'Could not find the document with ID: ' + req.params.id,
          404
        )
      );
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  }); // Missing closing parenthesis added here
};


//Fix:  Create document in DB
exports.createOne = (Model, populateOptions ) => {


  return catchAsync(async (req, res, next) => {
    
   const docc =  await Model.create(req.body)

    let query = Model.findById(docc._id)

    if (populateOptions) query = query.populate(populateOptions).lean()
    
    const doc = await query

    res.status(201).json({
      status: 'success',
      data: doc,
    })
  })
}

//Fix: Get a document from DB based on id provided in url
exports.getOne = (Model, populateOptions) => {

  return catchAsync(async (req, res, next) => {
    
    req.params.id = req.params.id || req.user._id
   
    let query = Model.findById(req.params.id)


    if (populateOptions) query = query.populate(populateOptions).lean()
    
    const doc = await query

    if (!doc) {
      return next(
        new AppError('Could not found document with ID: ' + req.params.id, 404)
      )
    }

    // images
    if(doc.photo){
      const image = fs.readFileSync(path.join(__dirname, `../public/img/${doc.photo}`))
      
    const base64EncodedImage = image.toString('base64');
    doc.photo = base64EncodedImage

      
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    })
  })
}

//Fix: Get all the documents from DB
exports.getAll = (Model, populateOptions, options) => {
  return catchAsync(async (req, res, next) => {
    let filterObj = { role: 'user' }

    const features = new APIFeatures(
      Model.find(filterObj).select('+password'),
      req.query
    )

    // ! EXECUTE THE QUERRY
    let query = features.query
    let docs

    if (populateOptions) {
      query = query.populate(populateOptions).lean()
    }

    docs = await query

    // images
    docs.forEach((doc) => {
      if (doc.photo) {
       
        const image = fs.readFileSync(
          path.join(__dirname, `../public/img/${doc.photo}`)
        )

        const base64EncodedImage = image.toString('base64')
        doc.photo = base64EncodedImage
      }
    })
    

    // ! SENDING THE REPONSE
    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: docs,
    })
  })
}
