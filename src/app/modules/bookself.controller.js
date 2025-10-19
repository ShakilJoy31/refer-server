"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.getContactById = exports.getContactInformation = exports.createContact = void 0;
const bookself_service_1 = require("./bookself.service");
const createContact = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, message } = req.body;
        const user = yield (0, bookself_service_1.createContactToDB)({ name, email, message });
        res.status(200).json({
            status: 'success',
            data: user
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            data: error
        });
    }
});
exports.createContact = createContact;
const getContactInformation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract pagination parameters from query (default: page=1, limit=10)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        // Fetch data from the database
        const { contacts, total, page: currentPage, limit: currentLimit } = yield (0, bookself_service_1.getContactFromDB)(page, limit);
        // Calculate total pages for pagination metadata
        const totalPages = Math.ceil(total / limit);
        res.status(200).json({
            status: 'success',
            data: contacts,
            pagination: {
                total,
                totalPages,
                currentPage,
                currentLimit,
            },
        });
    }
    catch (error) {
        // Type guard to check if error is an instance of Error
        if (error instanceof Error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to retrieve contact information',
                error: error.message,
            });
        }
        else {
            // Handle cases where the error is not an instance of Error
            res.status(500).json({
                status: 'error',
                message: 'Failed to retrieve contact information',
                error: 'An unknown error occurred',
            });
        }
    }
});
exports.getContactInformation = getContactInformation;
const getContactById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // Extract the ID from the request parameters
        // Call the service function to fetch the contact by ID
        const contact = yield (0, bookself_service_1.getContactByIdFromDB)(id);
        // If the contact is not found, return a 404 error
        if (!contact) {
            return res.status(404).json({
                status: 'error',
                message: 'Contact not found',
            });
        }
        // If the contact is found, return it in the response
        res.status(200).json({
            status: 'success',
            data: contact,
        });
    }
    catch (error) {
        // Handle errors
        if (error instanceof Error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to retrieve contact information',
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                status: 'error',
                message: 'Failed to retrieve contact information',
                error: 'An unknown error occurred',
            });
        }
    }
});
exports.getContactById = getContactById;
const deleteContact = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // Extract the ID from the request parameters
        // Call the service function to delete the contact
        const deletedContact = yield (0, bookself_service_1.deleteContactFromDB)(id);
        // If the contact is not found, return a 404 error
        if (!deletedContact) {
            return res.status(404).json({
                status: 'error',
                message: 'Contact not found',
            });
        }
        // If the contact is successfully deleted, return a success response
        res.status(200).json({
            status: 'success',
            message: 'Contact deleted successfully',
            data: deletedContact,
        });
    }
    catch (error) {
        // Handle errors
        if (error instanceof Error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to delete contact',
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                status: 'error',
                message: 'Failed to delete contact',
                error: 'An unknown error occurred',
            });
        }
    }
});
exports.deleteContact = deleteContact;
