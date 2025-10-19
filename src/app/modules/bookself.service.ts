import ContactForm, { IContactForm } from './newbook.model';
export const createContactToDB = async (payload: IContactForm): Promise<IContactForm> => {
  try {
    const user = new ContactForm(payload)
    await user.save()
    return user
  } catch (error) {
    throw error
  }
}


export const getContactFromDB = async (page: number, limit: number) => {
  try {
    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch data with pagination
    const contacts = await ContactForm.find()
      .skip(skip)
      .limit(limit)
      .exec();

    // Get the total number of documents for pagination metadata
    const total = await ContactForm.countDocuments();

    return {
      contacts,
      total,
      page,
      limit,
    };
  } catch (error) {
    throw error;
  }
};


export const getContactByIdFromDB = async (id: string) => {
  try {
    // Fetch the contact by ID from the database
    const contact = await ContactForm.findById(id).exec();

    return contact;
  } catch (error) {
    throw error;
  }
};



export const deleteContactFromDB = async (id: string) => {
  // Assuming you're using a MongoDB model (e.g., ContactModel)
  const deletedContact = await ContactForm.findByIdAndDelete(id);
  return deletedContact;
};