<?php
include_once './design_head.php';
?>

<div class="page-header">
    <h1></h1>

</div>
<div class="row-fluid">

    <div class="span4">
        <div id="left" class="well choice" style="margin-top: 125px;">

        </div>  
    </div>
    <div class="span4">
        <div id="up" class="well choice">

        </div> 
        <div id="overlay" style="position: absolute; width: 300px; height: 80px; padding-top: 13px; background-color:rgba(214, 214, 214, 1); text-align: center;">
            <span class="lead"></span>
        </div>
        <div class="row-fluid" style="margin: 10px; height: 100px;">
            <div class="row-fluid">
                <div class="span4 offset4">Up Arrow</div>
            </div>
            <div class="row-fluid">
                <div class="span4">Left Arrow</div>
                <div class="span4"><span id="timer" class="lead"></span>
                </div>
                <div class="span4">Right Arrow</div>
            </div>
            <div class="row-fluid">
                <div class="span4 offset4">Down Arrow</div>
            </div>
        </div>
        <div id="down" class="well choice">

        </div> 
    </div>
    <div class="span4" style="margin-top: 125px;">
        <div id="right" class="well choice">

        </div> 
    </div>
</div>

<?php
include_once './design_footer.php';
if (isset($_REQUEST["type"])) {
    $test = $_REQUEST["type"];
    $typeParts = explode("-", $test);
    $type = $typeParts[0];
    $testNice = str_replace("-", " ", $test);
    ?>
    <script type="text/javascript">
        $("body").addClass("<?php echo $test ?>")
        $(".page-header").find("h1").text("Test: <?php echo $testNice ?>")
        $(".choice").addClass("test-<?php echo $type ?>")
        initialiseTest()
    </script>
    <?php
}
?>