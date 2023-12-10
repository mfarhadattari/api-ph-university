import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

// ----------------------->> Get All Admin Controller <<--------------------
const getAllAdmins = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await AdminServices.getAllAdminsFromDB(query);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Admins retrieve successfully',
    data: result,
  });
});

// ----------------------->> Get Single Admin Controller <<--------------------
const getSingleAdmin = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AdminServices.getSingleAdminFromDB(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Admin retrieve successfully',
    data: result,
  });
});

// ----------------------->> Delete Admin Controller <<--------------------
const deleteAdmin = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AdminServices.deleteAdminFormDB(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully',
    data: result,
  });
});

// ----------------------->> Update Admin Controller <<--------------------
const updateAdmin = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { admin } = req.body;
  const result = await AdminServices.updateAdminIntoDB(id, admin);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully',
    data: result,
  });
});

export const AdminController = {
  getAllAdmins,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
};
