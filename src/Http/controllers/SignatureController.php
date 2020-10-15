<?php
namespace marriagetax\signature\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
/*use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Helpers\VisitorClass;
use App\Helpers\CakeClass;
use App\Helpers\PreviousDetailsClass;
use App\Helpers\FrontendClass;
use App\Helpers\CommonFunctions;
use App\Helpers\PdfClass;
use App\Helpers\PixelFire;
use App\Helpers\RedirectClass;
use DB;
use App\UserDetail;
use App\UserQuestionnaireAnswers; 
use App\User;
use App\Visitor;
use App\SplitInfo;
use App\Repositories\LiveSessionRepository;
use App\Helpers\UAClass;
use App\Helpers\UserClass;
use App\Repositories\HistoryRepository;*/


class SignatureController extends Controller
{
  /*  public function __construct()
    {
        $this->liveSession    = new LiveSessionRepository();
        $this->followHistory  = new HistoryRepository();
    }*/
    public function index(Request $request)
    {
        $resourcePath   = asset('assets').'/';
        return view('signature::signature',compact('resourcePath'));

        die();

        if (empty($request->visitor_id) || empty($request->user_id) ) {
            return redirect(403);
        } else {
            $intVisitorId   = $request->visitor_id;
            $intUserId      = $request->user_id;

            //Check tax payer
            UserClass::checkTaxPayer($intUserId);
        }
        $resourcePath           = asset('assets/signature').'/';
        $data                   = array();
        $data['title']          = 'Tax Allowance Awareness';
        $data['APP_URL']        = env('APP_URL');
        $data['intVisitorId']   = $intVisitorId;
        $data['intUserId']      = $intUserId;
        $ua                     =   new UAClass();
        $arrUserAgentInfo       =   $ua->parse_user_agent();
        $data['device']         =   $arrUserAgentInfo['device'];
        $txtTitle               = '';
        $signature_id           = '';
        $filePath1              = '';
        $is_pdf_sucess          = '';
        $arrVisitorUserData     =  VisitorClass::getVisitorUserTransDetails($intVisitorId,$intUserId);
        if(!empty($arrVisitorUserData)){
            $txtTitle   = $arrVisitorUserData->title;
        }
        $data['txtTitle']       = $txtTitle;
        $actionpage             = route('signature.store');
        if(empty($request->visitor_id) || empty($request->user_id) ){
            return redirect(403);
        }

        $split_name = Visitor::join('split_info', 'visitors.split_id', '=', 'split_info.id')->where('visitors.id','=',$request->visitor_id)->first()->split_name;

        $data['split_name'] = $split_name;
        $data['matomoPageName'] = 'Signature';

        return view('splits.signature',compact('data','arrVisitorUserData','resourcePath','actionpage'));
    }

    public function store(Request $request)
    {
        if (empty($request->visitor_id) || empty($request->user_id) ) {
            return redirect(403);
        } else {
            $intVisitorId   = $request->visitor_id;
            $intUserId      = $request->user_id;
        } 
        $PreviousArray          = $this->createPreviousArray($request->all());
        $signature_id           = PreviousDetailsClass::previousDetailsHandle($PreviousArray);
        // PDF CREATION
        if ($signature_id) {
            $this->liveSession->createUserMilestoneStats(array(
                    "user_id" =>$intUserId,
                    "source" =>'live',
                    "user_signature" =>1,
                )
            );
            // User::whereId($intUserId)->update(array('is_qualified'=> 1));
            //$filePath1     = storage_path().'/signature/esign.pdf';
           // $is_pdf_sucess = PdfClass::generatePdf($signature_id,$filePath1); 
            PixelFire::SetPixelFireStatus("SN",$intVisitorId,$intUserId);  
            $this->followHistory->insertFollowupLiveHistory(array(
                        "user_id" =>$intUserId,
                        "type" =>'signature',
                        "type_id" =>0,
                        "source" =>'live',
                        "value" =>'1',
                        "post_crm" =>0,
                    )
                );
        }
        // CAKE POSTING
       // if ($is_pdf_sucess) {
            //$arrResponse    = CakeClass::cakePostPbaSignature($intUserId,$intVisitorId);
       // }

        /*FrontendClass::redirectToConfirmPageDesktop("confirm",array("visitorId"=>$intVisitorId,"userId"=>$intUserId));*/

        /*RedirectClass::redirectToConfirmPageDesktop( 'confirm', array( 'userId'=>$intUserId, 'visitorId'=>$intVisitorId,'postToCake'=>''));*/
        // Update completed time and flag to user_milestone_stats table
        $this->liveSession->completedStatusUpdate($intUserId, 'live');

        RedirectClass::redirectToConfirmPageDesktop( 'questionnaire.intro', array( 'userId'=>$intUserId, 'visitorId'=>$intVisitorId,'postToCake'=>''));

    }

    public function createPreviousArray($request)
    {
        $previousAray = array (
            'user_id'           => $request['user_id'],
            'visitor_id'        => $request['visitor_id'],
            'previous_name'     => "",
            'signature_data'    => $request['signature_data'],
            'bank_id'           => '0',
            'previous_postcode' =>  @array('0' => $request['previous_postcode_1'], '1' => $request['previous_postcode_2']),
            'previous_address'  => @array('0' => $request['previous_address_1'], '1' => $request['previous_address_2']),
            'previous_address_pk'  => @array('0' => $request['previous_address_1_pk'], '1' => $request['previous_address_2_pk']),
            'previous_address_line1'  => @array('0' => $request['previous_address_1_line1'], '1' => $request['previous_address_2_line1']),
            'previous_address_line2'  => @array('0' => $request['previous_address_1_line2'], '1' => $request['previous_address_2_line2']),
            'previous_address_line3'  => @array('0' => $request['previous_address_1_line3'], '1' => $request['previous_address_2_line3']),
            'previous_address_city'  => @array('0' => $request['previous_address_1_city'], '1' => $request['previous_address_2_city']),
            'previous_address_province'  => @array('0' => $request['previous_address_1_province'], '1' => $request['previous_address_2_province']),
            'previous_address_country'  => @array('0' => $request['previous_address_1_country'], '1' => $request['previous_address_2_country']),
            'previous_address_company'  => @array('0' => $request['previous_address_1_company'], '1' => $request['previous_address_2_company'])
        );

        return $previousAray;
    }
    public function terms()
    {
        $resourcePath           = asset('assets/signature-terms').'/';
        $data                   = array();
        $data['title']          = 'Tax Allowance Awareness';
        $data['APP_URL']        = env('APP_URL');
        return view('splits.signature-terms',compact('data','resourcePath'));
    }
}