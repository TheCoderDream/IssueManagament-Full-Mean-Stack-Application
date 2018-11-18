const path = require('path');

const {validationResult} = require('express-validator/check');
const Issue = require('../models/issue');
const User = require('../models/user');


exports.getIssues = (req, res, next) => {
    const currentPage = req.query.page | 1;
    const perPage = 4;
    let totalItems;
    Issue.find()
        .countDocuments()
        .then(count => {
            totalItems = count;
            return Issue.find()
                .skip((currentPage - 1) * perPage)
                .limit(perPage)
        }).then(issues => {
        res.status(200).json({
            message: 'Fetched issues successfully.',
            issues,
            totalItems
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
};

exports.postIssue = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    let creator;
    const newIssue = new Issue({
        title: req.body.title,
        description: req.body.description,
        severity: req.body.severity,
        status: req.body.status
    });

    newIssue.save()
        .then(result => {
            return User.findById(req.userId);
        })
        .then(user => {
            creator = user;
            user.issues.push(newIssue);
            return user.save();
        })
        .then(result => {
            res.status(201).json({
                message: 'Issue created successfully',
                issue: newIssue,
                creator: {_id: creator._id, name: creator.name}
            })

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.getIssue = (req, res, next) => {
    const issueId = req.params.issueId;
    console.log(issueId);

    Issue.findById(issueId)
        .then(issue => {
            if (!issue) {
                const error = new Error('Could not find issue.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({message: 'Issue fetched.', issue});
        }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })

};


exports.deleteIssue = (req, res, next) => {
    const issueId = req.params.issueId;

    Issue.findById(issueId)
        .then(issue => {
            if (!issue) {
                const error = new Error('Could not foind issue.');
                error.statusCode = 404;
                throw error;
            }
            if (issue.creator.toString() !== req.userId) {
                const error = new Error('Not Authorized!');
                error.statusCode = 403;
                throw error;
            }

            return issue.findByIdAndRemove(issueId);
        })
        .then(result => {
            return User.findById(req.userId);
        })
        .then(user => {
            user.issues.pull(issueId);
            return user.save();
        })
        .then(result => {
            res.status(200).json({message: 'Deleted issue.'});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.updateIssue = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect');
        error.statusCode = 422;
        throw error;
    }

    const issueId = req.params.issueId;

    const title = req.body.title;
    const description = req.body.description;
    const severity = req.body.severity;
    const status = req.body.status;


    Issue.findById(issueId)
         .then(issue => {
             if(!issue) {
                 const error = new Error('Could not find issue.');
                 error.statusCode = 404;
                 throw error;
             }

             if(issue.creator.toString() !== req.userId) {
                 const error = new Error('Not authorized!');
                 error.statusCode = 403;
                 throw error;
             }

             issue.title = title;
             issue.description = description;
             issue.severity = severity;
             issue.status = status;
             return issue.save();
         })
        .then(result => {
            res.status(200).json({message: 'Issue Updated!', issue: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }

            next(err);
        })
};