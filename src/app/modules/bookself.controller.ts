import {
  NextFunction,
  Request,
  Response,
} from 'express';

import {
  createContactToDB,
  deleteContactFromDB,
  getContactByIdFromDB,
  getContactFromDB,
} from './bookself.service';

export const createContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, message } = req.body
    const user = await createContactToDB({name, email, message})
    res.status(200).json({
      status: 'success',
      data: user
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      data: error
    })
  }
}


export const getContactInformation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract pagination parameters from query (default: page=1, limit=10)
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Fetch data from the database
    const { contacts, total, page: currentPage, limit: currentLimit } = await getContactFromDB(page, limit);

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
  } catch (error) {
    // Type guard to check if error is an instance of Error
    if (error instanceof Error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve contact information',
        error: error.message,
      });
    } else {
      // Handle cases where the error is not an instance of Error
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve contact information',
        error: 'An unknown error occurred',
      });
    }
  }
};

export const getContactById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params; // Extract the ID from the request parameters

    // Call the service function to fetch the contact by ID
    const contact = await getContactByIdFromDB(id);

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
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve contact information',
        error: error.message,
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve contact information',
        error: 'An unknown error occurred',
      });
    }
  }
};



export const deleteContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params; // Extract the ID from the request parameters

    // Call the service function to delete the contact
    const deletedContact = await deleteContactFromDB(id);

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
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to delete contact',
        error: error.message,
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: 'Failed to delete contact',
        error: 'An unknown error occurred',
      });
    }
  }
};
